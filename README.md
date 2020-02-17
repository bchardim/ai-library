# Ansible

This library contains ansible roles to cleanup and deploy models in AI Library as Seldon applications. The scripts create REST endpoints for the models in AI Library through seldon model serving.

# Ansible Scripts

## roles/deploy_actions

`deploy.yaml` - File to activate role 'deploy_models'

## roles/deploy_models/tasks

`deploy_models.yml` - deploy the above models.

## roles/deploy_actions/defaults

`main.yml` - parameter definition for commands in deploy_models.yml

# Command

## Steps

The following steps deploy models in AI Library through Seldon by using Ansible.

Pre-requisite:  You must have seldon-core running in your namespace.

1. Modify the ansible/roles/deploy_models/defaults/main.yml to set parameter values for your environment.
    Some of the values are self-explanatory.  Others are not.  Some clarification is provided below.
      * The following parameters MUST be changed before you try to install
        * workspace:  This is a directory on your filesystem where the ai-library will be cloned from gitlab
        * namespace:  This is the OpenShift project where you want to install AI Library
        * container_account: This should be a user of the registry specified by the container_repo parameter 
        * apigateway: This should be essentially the base URL of your Openshift instance ie:  https://<yourserver>:8443
        * s3endpointUrl | s3objectStoreLocation | s3accessKey | s3secretKey: Parameters required to access s3 backend.
      * oc:  This is the location for the OpenShift cli oc binary.  Adjust to whichever path suits your environment.
      * Each service has 3 parameters of the form &lt;service&gt;_[name|memory|cpu].  
2. cd ansible
3. ansible-playbook roles/deploy_models/deploy.yml --tags|--skip-tags <TAGS>

The following tags are supported for the models,
 * Model related tags
   * correlation_analysis
   * association_rule_learning
   * flakes_predict
   * regression_train
   * matrix_factorization
   * fraud_detection
   * topic_model
   * regression_predict
 * Build related tags
   * build_image - include or skip to build image for each model.
 * Route related tags
   * create_route - include or skip to create routes for each model.
 * Workspace related tags
   * prep_workspace - include preparation of temporary workspace

A sample command to install regression prediction, skip the container build process and create route to the pod serving the model would be 

 * ansible-playbook roles/deploy_models/deploy.yml --tags prep_workspace,regression_predict,create_route --skip-tags build_image

After the deployment completes, routes are exposed to each of the model/service. For convenience, the routes are retrieved automatically and stored under model.routes in the workspace folder (defined in main.yml). 
