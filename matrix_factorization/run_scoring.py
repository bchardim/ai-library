"""The Endpoint to serve model training and scoring."""
import os
from os import listdir
from os.path import isfile, join
import json
import argparse
import sys
import inspect
currentdir = os.path.dirname(
               os.path.abspath(
                inspect.getfile(inspect.currentframe())
                )
               )
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir + "/storage")
import s3
import time
import tempfile

LOCAL_DATA_LINK = 'ai_models/hpf-insights'
HPF_SCORING_REGION = ""

global scoring_status
global scoring_object

# Run hpf scoring model on the input to find the package
# recommendation

def hpf_scoring(input_stack, hpf_scoring_region):

    output_json = dict()
    if input_stack["ecosystem"] != hpf_scoring_region: 
        output_json = {"Error": "Input ecosystem does not match"}
    else:
        companion_recommendation, package_to_topic_dict, \
            missing_packages = scoring_object.predict(
                input_stack['package_list'])
        output_json = {
            "alternate_packages": {},
            "missing_packages": missing_packages,
            "companion_packages": companion_recommendation,
            "ecosystem": input_stack["ecosystem"],
            "package_to_topic_dict": package_to_topic_dict,
        }
    return output_json

class run_scoring(object):

    def __init__(self):
        self.model = 'None'

    def predict(self,data,features_names):
        result = "PASS"
        params = dict((item.strip()).split("=") for item in data.split(","))
        print(params)
        eparams = ["ecosystem","packagelist", "model", "config"]
        if not all (x in params for x in eparams):
          print("Not all parameters have been defined")
          result = "FAIL"
          return result
        ecosystem = params['ecosystem']
        packagelist = params['packagelist']
        model = params['model']
        config = params['config']
        s3endpointUrl = os.environ['S3ENDPOINTURL']
        s3objectStoreLocation = os.environ['S3OBJECTSTORELOCATION']
        s3accessKey = os.environ['S3ACCESSKEY']
        s3secretKey = os.environ['S3SECRETKEY']

        tmpdir = str(tempfile.mkdtemp())

        # Create S3 session to access Ceph backend and get an S3 resource
        session = s3.create_session_and_resource(s3accessKey,
                                                 s3secretKey,
                                                 s3endpointUrl)

        # Download the config file that contains hyper parameter definition
        s3.download_file(session,
                         s3objectStoreLocation,
                         config,
                         tmpdir + '/config.py')

        from src.data_store.local_data_store import LocalDataStore
        from src.scoring.hpf_scoring import HPFScoring
        from src.utils import convert_string2bool_env
        sys.path.append(tmpdir)
        import config
        from config import HPF_SCORING_REGION
        print("------------------")
        print(HPF_SCORING_REGION)
        print("------------------")
        global scoring_status
        global scoring_object

        SOURCE_DIR = tmpdir + "/" + LOCAL_DATA_LINK + '/' + HPF_SCORING_REGION


        if not os.path.exists(SOURCE_DIR):
            os.makedirs(SOURCE_DIR)

        s3.download_folder(s3accessKey,
                           s3secretKey,
                           s3endpointUrl,
                           s3objectStoreLocation,
                           model,
                           SOURCE_DIR)

        if HPF_SCORING_REGION != "":  
            data_object = LocalDataStore(tmpdir + "/" + LOCAL_DATA_LINK)
            scoring_object = HPFScoring(datastore=data_object)
            scr_object = HPFScoring(datastore=data_object)
            jdata = {}
            jdata['ecosystem'] = ecosystem
            jdata['package_list']= packagelist.split(";")
            response = hpf_scoring(jdata, HPF_SCORING_REGION)
            result = str(response)
        else:
            result = "Error: No scoring region provided"
        print(result)
        return result

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('-data', help='prediction data set', default='')
  args = parser.parse_args()
  data = args.data
  obj = run_scoring()
  obj.predict(data,20)
  
if __name__== "__main__":
  main()

