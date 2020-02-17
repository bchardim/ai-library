import numpy as np
import re
import os
from itertools import islice
from operator import itemgetter
from sklearn.metrics import jaccard_similarity_score
from os import listdir
from os.path import isfile, join
import nltk
nltk.data.path.append("/tmp");
nltk.download('stopwords',download_dir='/tmp')
nltk.download('wordnet',download_dir='/tmp')
nltk.download('punkt',download_dir='/tmp')
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import argparse
import json
import model_topics as mt
import time
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

NUM_TOPICS = 2
NUM_WORDS = 10
PASSES = 50

# Find distance between given set of words

def jaccard_similarity(x, y):
    x1 = set(x)
    y1 = set(y)
    z = x1.intersection(y1)
    return ((len(z)*100)/(len(x1) + len(y1) - len(z)))


# Tokenize given text

def get_tokens(text):
    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(text)
    filtered_sentence = [w for w in word_tokens if not w in stop_words]
    filtered_sentence = []
    for w in word_tokens:
        if w not in stop_words:
            filtered_sentence.append(w.lower())
    return(filtered_sentence)

class duplicate_predict(object):

    def __init__(self):
        self.model = 'None'

    def predict(self,data,features_names):
        result = "PASS"
        params = dict((item.strip()).split("=") for item in data.split(","))
        print(params)
        eparams = ["model", "bugs", "resultlocation", "num_matches"]
        if not all (x in params for x in eparams):
          print("Not all parameters have been defined")
          result = "FAIL"
          return result

        s3Path = params['model']
        bugs = params['bugs']
        num_matches = params['num_matches']
        s3Destination = params['resultlocation']

        s3endpointUrl = os.environ['S3ENDPOINTURL']
        s3objectStoreLocation = os.environ['S3OBJECTSTORELOCATION']
        s3accessKey = os.environ['S3ACCESSKEY']
        s3secretKey = os.environ['S3SECRETKEY']

        tmpdir = str(tempfile.mkdtemp())
        print(tmpdir)

        if not os.path.exists(tmpdir + '/duplicates/'):
            os.makedirs(tmpdir + '/duplicates/')

        s3.download_folder(s3accessKey,
                           s3secretKey,
                           s3endpointUrl,
                           s3objectStoreLocation,
                           bugs,
                           tmpdir + '/duplicates/')

        if not os.path.exists(tmpdir + '/result/'):
            os.makedirs(tmpdir + '/result/')

        mypath = tmpdir + '/duplicates/'
        onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

        # For each given bug, compute the jaccard similarity of the title
        # and contents of existing bug. Collect all scores and sort to 
        # find the top matches

        for duplfile in onlyfiles:
            print("Processing - " + duplfile)
            filepath = mypath + duplfile
            with open(filepath) as f:
                data = json.load(f)
                print(filepath)
                dtitle = data['title']
                dcontent = data['content']

                title = re.sub(r"[^a-zA-Z0-9]+", ' ', dtitle)
                content = dcontent.split("\n")
                for index, item in enumerate(content):
                    content[index] = re.sub(r"[^a-zA-Z0-9]+", ' ', item)

                doc_clean = [mt.clean(doc).split() for doc in content]
                bcontents = mt.gen_topics(doc_clean, NUM_TOPICS, NUM_WORDS, PASSES)

                session = s3.create_session_and_resource(s3accessKey,
                                                         s3secretKey,
                                                         s3endpointUrl)
                objects = s3.get_objects(session, s3objectStoreLocation, s3Path)
                filelist = []
                tscores = []
                cscores = []
                for key in objects:
                    doc_complete = []
                    data = {}
                    obj = ""
                    obj = session.Object(s3objectStoreLocation, key)

                    contents = obj.get()['Body'].read().decode('utf-8')
                    filename = key.split("/")
                    if contents:
                        jcontents = json.loads(contents)

                        jtitle = jcontents['title']
                        jcontent = jcontents['content']

                        # Match by title
                        x = get_tokens(title)
                        y = get_tokens(jtitle)
                        score = jaccard_similarity(x, y)
                        tscore = []
                        tscore.append(score)
                        tscore.append(filename[-1])
                        tscore.append(jtitle)
                        tscores.append(tscore)

                        # Match by content
                        for item in jcontent:
                            data = re.sub(r"[^a-zA-Z0-9]+", ' ', item)
                            y = get_tokens(data)
                            for cnt in bcontents:
                                x = get_tokens(cnt)
                                score = jaccard_similarity(x, y)
                                cscore = []
                                cscore.append(score)
                                cscore.append(filename[-1])
                                cscore.append(jtitle)
                                cscores.append(cscore)

                matches = {}
                match = {}
                index = 0
                tscores = sorted(tscores, key=itemgetter(0), reverse=True)
                del tscores[num_matches:]
                for item in tscores:
                    match = {}
                    match['id'] = item[1]
                    match['title'] = item[2]
                    matches[index] = match
                    index += 1

                cscores = sorted(cscores, key=itemgetter(0), reverse=True)
                del cscores[num_matches:]
                for item in cscores:
                    match = {}
                    match['id'] = item[1]
                    match['title'] = item[2]
                    matches[index] = match
                    index += 1

                with open(tmpdir + '/result/' + duplfile, 'w') as outfile:
                    json.dump(matches, outfile)

        # Write results to Ceph backend
        s3.upload_folder(s3accessKey,
                         s3secretKey,
                         s3endpointUrl,
                         s3objectStoreLocation,
                         tmpdir + '/result',
                         s3Destination)
        return result

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('-data', help='prediction data set', default='')
  args = parser.parse_args()
  data = args.data
  obj = duplicate_predict()
  obj.predict(data,20)
  
if __name__== "__main__":
  main()
