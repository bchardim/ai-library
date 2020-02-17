from dateutil import parser
import json
import os
import subprocess
import time

import s3


def get_new_models(new_list, old_list):
    new_models = set(new_list) - set(old_list)
    print("New models are: ", new_models)
    return new_models


def get_updated_models(new_list, old_list):
    updated_list = {}
    for old_model in old_list:
        if new_list.get(old_model, None) is not None:
            new_timestamp = parser.parse(new_list[old_model]["modified"])
            old_timestamp = parser.parse(old_list[old_model]["modified"])
            if new_timestamp > old_timestamp:
                updated_list[old_model] = new_list[old_model]
    return updated_list


def save_file_list(files_with_info):
    status_file = os.environ['STATUS_LOCATION']
    with open(status_file, "w") as new_file:
        json.dump(files_with_info, new_file)


def add_new_models_to_status(model_info, new_models):
    current_status = get_existing_file_list()
    for model in new_models:
        current_status[model] = model_info[model]
    save_file_list(current_status)


def get_existing_file_list():
    try:
        status_file = os.environ['STATUS_LOCATION']
        with open(status_file) as current_file:
            return json.load(current_file)
    except FileNotFoundError:
        return {}


def get_new_file_list(theobjects):
    files_with_info = {}
    for obj in theobjects:
        model_name = os.path.splitext(os.path.basename(obj.key))[0]
        files_with_info[model_name] = \
            {
                'modified': str(obj.last_modified),
                'filename': obj.key
            }
        print(obj.key, files_with_info[model_name])
    return files_with_info


def save_model_locally(s3obj, model):
    s3.download_file(s3obj, os.environ['S3BUCKET'], model, "./runner/model.pkl")
    return os.path.basename(model)


def monitor_build(build_name):
    print("Monitoring build: ", build_name)
    poll_command = ['oc', 'get', 'build',  build_name,  "--template='{{ .status.phase }}'"]
    result = subprocess.run(poll_command,
                            stdout=subprocess.PIPE,
                            stderr=subprocess.STDOUT)
    build_result = result.stdout.decode('utf-8')

    while build_result not in ["'Complete'", "'Error'", "'Failed'"]:
        time.sleep(60)
        result = subprocess.run(poll_command,
                                stdout=subprocess.PIPE,
                                stderr=subprocess.STDOUT)
        build_result = result.stdout.decode('utf-8').strip()
        print("Current build result is : ", build_result)

    if build_result in ["'Failed'"]:
        print("Build for ", build_name, " has failed.  Will skip deploy steps.")
        return None

    get_image_command = ['oc', 'get', 'build',  build_name,  "--template='{{ .status.outputDockerImageReference }}'"]
    result = subprocess.run(get_image_command,
                            stdout=subprocess.PIPE,
                            stderr=subprocess.STDOUT)
    result_image = result.stdout.decode('utf-8')
    print("The build finished and can be found at: ", result_image)
    return result_image.strip("'")


def build_model_image(model_name):
    base_python_s2i = 'registry.access.redhat.com/ubi8/python-36'
    new_build_command = ['oc', 'new-build', '--binary', '--docker-image', base_python_s2i,
                         '--name', model_name, '--strategy=source']
    start_build_command = ['oc', 'start-build', model_name, '--from-dir', './runner']
    get_build_command = \
        ['oc', 'get', 'buildconfig', model_name, '--template={{.metadata.name}}-{{.status.lastVersion}}']

    subprocess.run(new_build_command, stdout=subprocess.DEVNULL)
    subprocess.run(start_build_command, stdout=subprocess.DEVNULL)
    result = subprocess.run(get_build_command, stdout=subprocess.PIPE)
    build_name = result.stdout.decode('utf-8')

    return monitor_build(build_name)


def deploy_model_service(model_name, model_image):
    temp_yaml = "./dep.yaml"
    # Currently using model_name in a lot of these values.  Ideally, we would use something user-supplied
    # to make things more secure, but for the first iteration, we do not have that as an option
    process_command = ['oc', 'process', '-f', 'seldontemplate.yaml',
                       'GRAPH_TYPE=MODEL', 'NAME=' + model_name,
                       'NAMESPACE=' + os.environ['PROJ_NAMESPACE'], 'MODELKEY=' + model_name,
                       'MODELSECRET=' + model_name, 'MODEL_IMAGE=' + model_image,
                       'CONTAINER_NAME=' + model_name + '-c', 'MODELPODNAME=' + model_name + '-p',
                       'MEMORY=1Gi']
    deploy_command = ['oc', 'create', '-f', temp_yaml]

    with open(temp_yaml, 'w') as outfile:
        subprocess.run(process_command, stdout=outfile)
    subprocess.run(deploy_command)


def check_and_record_model_deployment(model_name, new_file_list):
    # Long line to keep the whole template on one line where I think it's slightly more readable.
    check_command = ['oc', 'get', 'seldondeployment', model_name, '--template=\'{{index (index (index (index (index (index (index .spec.predictors 0) "componentSpecs") 0) "spec") "containers") 0) "image"}}|{{.metadata.creationTimestamp}}\'']
    result = subprocess.run(check_command, stdout=subprocess.PIPE)
    deployed_image, deployment_creation = result.stdout.decode('utf-8').split('|')
    if deployment_creation not in [None, '']:
        status = get_existing_file_list()
        status[model_name]['modified'] = new_file_list[model_name]['modified']
        status[model_name]['deploymentcreation'] = deployment_creation
        status[model_name]['deployedimage'] = deployed_image
        save_file_list(status)
        # Improve this for versioning maybe?


def serve_new_models(s3obj, models, new_file_list):
    for model_name in models:
        save_model_locally(s3obj, new_file_list[model_name]["filename"])
        model_image = build_model_image(model_name)
        if model_image is not None:
            deploy_model_service(model_name, model_image)
            check_and_record_model_deployment(model_name, new_file_list)


def kill_old_service_pod(model_name):
    get_pod_name_command = ['oc', 'get', 'pod', '-l seldon-deployment-id=' + model_name + '-p-' + model_name,
                            '--template="{{range .items}}{{.metadata.name}}{{end}}"']
    result = subprocess.run(get_pod_name_command, stdout=subprocess.PIPE)
    pod_name = result.stdout.decode('utf-8').strip('"')
    kill_command = ['oc', 'delete', 'pod', pod_name]
    subprocess.run(kill_command)


def update_models(s3obj, models, new_file_list):
    for model_name in models:
        save_model_locally(s3obj, new_file_list[model_name]["filename"])
        model_image = build_model_image(model_name)
        if model_image is not None:
            # removing old pod will trigger relaunch with updated image
            try:
                kill_old_service_pod(model_name)
            except Exception:
                pass
            check_and_record_model_deployment(model_name, new_file_list)

def main():
    s3obj = s3.create_session_and_resource(os.environ['S3KEY'], os.environ['S3SECRET'], os.environ['S3ENDPOINT'])

    while True:
        theobjects = s3.get_objects(s3obj, os.environ['S3BUCKET'], os.environ['S3PREFIX'], fullobj=True)
        new_file_list = get_new_file_list(theobjects)
        previous_file_list = get_existing_file_list()
        new_models = get_new_models(new_file_list, previous_file_list)
        updated_models = get_updated_models(new_file_list, previous_file_list)
        print("There are: ", len(new_models), " new models to spin-up as a service")
        print("There are: ", len(updated_models), " models that have been updated")

        if len(new_models) > 0:
            add_new_models_to_status(new_file_list, new_models)
            serve_new_models(s3obj, new_models, new_file_list)
        if len(updated_models) > 0:
            update_models(s3obj, updated_models, new_file_list)
        time.sleep(int(os.environ['S3POLLINTERVAL']))


if __name__ == "__main__":
    main()
