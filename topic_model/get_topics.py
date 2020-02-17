from urllib.request import urlopen
import argparse
import re
import nltk
from bs4 import BeautifulSoup
import model_topics as mt
import gensim
import os
from os import listdir
from os.path import isfile, join
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

NUM_TOPICS = 5
NUM_WORDS = 12
PASSES = 10

def cleanhtml(raw_html):
  cleanr = re.compile('<.*?>')
  cleantext = re.sub(cleanr, '', raw_html)
  return cleantext

def cleandoc(text):
    result=[]
    for token in gensim.utils.simple_preprocess(text) :
        if token not in gensim.parsing.preprocessing.STOPWORDS and len(token) > 3:
            result.append(token)
    return result

class get_topics(object):

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

        doc_complete = data.split('.')
        doc_clean = [cleandoc(doc) for doc in doc_complete]
        topics = mt.gen_topics(doc_clean, NUM_TOPICS, NUM_WORDS, PASSES)
        result = topics[0]
        return result


def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('-data', help='prediction data set', default='')
  args = parser.parse_args()
  data = args.data
  obj = get_topics()
  output = obj.predict(data,20)
  print(output)

if __name__== "__main__":
  main()


