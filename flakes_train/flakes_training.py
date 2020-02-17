import argparse
import json
import os
import os.path
from shutil import copy2
import subprocess
import tempfile


def walkfiles(basedir):
    filelist = []
    for path, dirs, files in os.walk(basedir):
        for file in files:
            if os.path.isfile(path + '/' + file):
                filelist.append(path + '/' + file)
    return filelist


class flakes_training(object):

    def __init__(self):
        self.model = 'None'

    def predict(self, inputdir, outputdir, features_names):
        tmpdir = str(tempfile.mkdtemp())
        SOURCE_DIR = tmpdir + '/' + 'bots/images/'

        if not os.path.exists(SOURCE_DIR):
            os.makedirs(SOURCE_DIR)

        if os.path.exists(tmpdir + "/" + "bots/images/data.jsonl"):
            os.remove(tmpdir + "/" + "bots/images/data.jsonl")

        # Create jsonl from json training data
        fname = SOURCE_DIR + '/data.jsonl'

        print("Searching " + inputdir + " for data files to process")
        objects = walkfiles(inputdir)
        print("There are " + str(len(objects)) + " files to load")

        with open(fname, 'a') as outfile:
            for key in objects:
                with open(key, encoding='utf-8') as json_file:
                    jcontents = json.loads(json_file.read())
                    json.dump(jcontents, outfile)
                    outfile.write('\n')

        subprocess.Popen(["ls", "-lp", SOURCE_DIR])
        # Train model
        cmd = "python3 bots/learn-tests --dry " + fname
        os.system(cmd)
        print("Training complete!")

        cmd = 'find ' + SOURCE_DIR + ' -name tests-learn*.model -exec readlink -f {} \\;'
        model = os.popen(cmd).read()
        print("Found model : " + model)
        copy2(model.strip(), outputdir)
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
    obj = flakes_training()
    obj.predict(args.inputdir, args.outputdir, 20)


if __name__ == "__main__":
    main()


