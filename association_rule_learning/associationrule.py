import argparse
import model
import s3fs
import os
import csv
import psycopg2
import pandas as pd
import inspect
import sys
currentdir = os.path.dirname(
               os.path.abspath(
                inspect.getfile(inspect.currentframe())
                )
               )
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir + "/storage")
import s3
import tempfile
import numpy as np
from collections import Counter
from itertools import combinations, groupby


class associationrule(object):

    def __init__(self):
        self.model = 'None'

    def predict(self,data,features_names):
        result = "PASS"
        params = dict((item.strip()).split("=") for item in data.split(","))
        print(params)
        eparams = ["data"]
        if not all (x in params for x in eparams):
          print("Not all parameters have been defined")
          result = "FAIL"
          return result

        data = params['data']
        s3endpointUrl = os.environ['S3ENDPOINTURL']
        s3objectStoreLocation = os.environ['S3OBJECTSTORELOCATION']
        s3accessKey = os.environ['S3ACCESSKEY']
        s3secretKey = os.environ['S3SECRETKEY']

        tmpdir = str(tempfile.mkdtemp())
        dataurl = data.split("/")
        DATA = dataurl[-1]
        FILE = tmpdir + "/" + DATA

        # Download the data from storage backend in to tmpdir
        session = s3.create_session_and_resource(s3accessKey,
                                                 s3secretKey,
                                                 s3endpointUrl)
        s3.download_file(session,
                         s3objectStoreLocation,
                         data,
                         FILE)

        with open(FILE, 'r') as f:
          reader = csv.reader(f)
          df_rules = list(reader)

        #df_rules = pd.read_csv('data.csv')
        pd_flat = model.data_processing(df_rules)
        rules = model.association_rules(pd_flat, 0.01)
        print("Rules generation is complete.")
        result = rules.to_string()
        print(result)
        return result


def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('-data', help='prediction data set', default='')
  args = parser.parse_args()
  data = args.data
  obj = associationrule()
  obj.predict(data,20)

if __name__== "__main__":
  main()

