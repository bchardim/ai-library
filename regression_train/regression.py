import pandas as pd
import json
from pandas import DataFrame
from sklearn import linear_model
import csv
import argparse
import os
from os import listdir
from os.path import isfile, join
from sklearn.metrics import mean_squared_error
from math import sqrt
import statistics
import inspect
import sys
currentdir = os.path.dirname(
               os.path.abspath(
                inspect.getfile(inspect.currentframe())
                )
               )
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir + "/accuracy_measures")
import measures
sys.path.append(parentdir + "/storage")
import s3
import tempfile
from sklearn.externals import joblib


class regression(object):

    def __init__(self):
        self.model = 'None'

    def predict(self,data,features_names):
        result = "PASS"
        params = dict((item.strip()).split("=") for item in data.split(","))
        print(params)
        eparams = ["trainingdata", "outputmodel"]
        if not all (x in params for x in eparams):
          print("Not all parameters have been defined")
          result = "FAIL"
          return result
        data = params['trainingdata']
        s3Destination = params['outputmodel']
        s3endpointUrl = os.environ['S3ENDPOINTURL']
        s3objectStoreLocation = os.environ['S3OBJECTSTORELOCATION']
        s3accessKey = os.environ['S3ACCESSKEY']
        s3secretKey = os.environ['S3SECRETKEY']

        tmpdir = str(tempfile.mkdtemp())
        dataurl = data.split("/")
        DATA = dataurl[-1]
        FILE = tmpdir + "/" + DATA

        # Download the input data from storage backend in to tmpdir
        session = s3.create_session_and_resource(s3accessKey,
                                                 s3secretKey,
                                                 s3endpointUrl)
        s3.download_file(session,
                         s3objectStoreLocation,
                         data,
                         FILE)
        print(FILE)

        with open(FILE, "rt") as f:
         reader = csv.reader(f)
         i = next(reader)
         col = i[:]
         y_col = i[-1]
         del i[-1]
         x_col = i

        data = pd.read_csv(FILE)
        df = DataFrame(data,columns=col)
        X = df[x_col]
        Y = df[y_col]
 
        # with sklearn
        regr = linear_model.LinearRegression()
        regr.fit(X, Y)
        filename = tmpdir + "/" + 'model.pkl'
        joblib.dump(regr, filename)

        print('Model Parameters:')
        print('Intercept: ', regr.intercept_)
        print('Coefficients: ', regr.coef_)

        # upload model to s3 backend
        s3.upload_file(session,
                       s3objectStoreLocation,
                       filename,
                       s3Destination)

        return result 


def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('-data', help='prediction data set', default='')
  args = parser.parse_args()
  data = args.data
  obj = regression()
  obj.predict(data,20)
  
if __name__== "__main__":
  main()
