import datetime
import time
import csv
import io
import os
import uuid
import argparse
import subprocess
import zipfile
import json
import re
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
import tempfile

class flakes_prediction(object):

    def __init__(self):
        self.model = 'None'

    def predict(self,data,features_names):
        result = "PASS"
        params = dict((item.strip()).split("=") for item in data.split(","))
        eparams = ["model", "data"]
        if not all (x in params for x in eparams):
          print("Not all parameters have been defined")
          result = "FAIL"
          return result
        model = params['model']
        data = params['data']
        s3endpointUrl = os.environ['S3ENDPOINTURL']
        s3objectStoreLocation = os.environ['S3OBJECTSTORELOCATION']
        s3accessKey = os.environ['S3ACCESSKEY']
        s3secretKey = os.environ['S3SECRETKEY']
        
        tmpdir = str(tempfile.mkdtemp())
        MODEL_PATH = tmpdir + '/bots/images/'
        if not os.path.exists(MODEL_PATH):
            os.makedirs(MODEL_PATH)

        modelurl = model.split("/")
        modelfile = modelurl[-1]
        MODEL = MODEL_PATH + modelfile

        # Download the trained model from storage backend in to MODEL_PATH
        session = s3.create_session_and_resource(s3accessKey,
                                                 s3secretKey,
                                                 s3endpointUrl)
        s3.download_file(session,
                         s3objectStoreLocation,
                         model,
                         MODEL)

        pipe_predict = 'python bots/tests-policy -model ' + MODEL + ' -data \'' + data + '\' tmp.txt '
        cmd = pipe_predict + ' | grep -Po \'Flake probability: \K([0-9]+[.][0-9]+)\''

        prob = os.popen(cmd).read()
        if prob: 
         result = prob
        else:
         result = "0.0"
        result = result.strip()
        print(result)
        return result

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('-data', help='prediction data set', default='')
  args = parser.parse_args()
  data = args.data
  obj = flakes_prediction()
  obj.predict(data,20)

if __name__== "__main__":
  main()
