import model_topics as mt
import os
import os.path
import argparse
import json
import sys
import inspect
currentdir = os.path.dirname(
               os.path.abspath(
                inspect.getfile(inspect.currentframe())
                )
               )
parentdir = os.path.dirname(currentdir)
sys.path.append(parentdir + "/storage")


NUM_TOPICS = 2
NUM_WORDS = 10
PASSES = 50


def walkfiles(basedir):
    filelist = []
    for path, dirs, files in os.walk(basedir):
        for file in files:
            if os.path.isfile(path + '/' + file):
                filelist.append(path + '/' + file)
    return filelist


class duplicate_train(object):

    def __init__(self):
        self.model = 'None'

    def predict(self, inputdir, outputdir):
        filelist = []

        # For each existing bug, perform topic modeling of the contents
        # to arrive at topics for each bug.

        tmpdir = outputdir
        objects = walkfiles(inputdir)
        for key in objects:
            print(key)
            data = {}

            path = key.split("/")
            filename = path[-1]
            if True:
                with open(key, encoding='utf-8') as json_file:
                    jcontents = json.loads(json_file.read())
                    title = jcontents['title']
                    comments = jcontents['content']
                    doc_complete = comments.split('\n')
                    doc_clean = [mt.clean(doc).split() for doc in doc_complete]
                    topics = mt.gen_topics(doc_clean, NUM_TOPICS, NUM_WORDS, PASSES)
                    data['title'] = title
                    data['content'] = topics
                    filelist.append(filename)
                    with open(tmpdir + "/" + filename, 'w') as outfile:
                        json.dump(data, outfile)
        return


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-inputdir',
                      help='location of input data',
                      default=os.environ.get("INPUT_DIR", "/opt/app-root/src/data"))
    parser.add_argument('-outputdir',
                      help='location of output data',
                      default=os.environ.get("OUTPUT_DIR", "/mnt/vol"))
    args = parser.parse_args()
    obj = duplicate_train()
    obj.predict(args.inputdir, args.outputdir)


if __name__ == "__main__":
    main()

