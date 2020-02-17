import logging
import argparse
import os
import pandas as pd
from datetime import datetime

import datetime
import joblib
import numpy as np
import matplotlib.pyplot as plt

logging.disable(logging.WARN)


def walkfiles(basedir):
    filelist = []
    for path, dirs, files in os.walk(basedir):
        for file in files:
            if os.path.isfile(path + '/' + file):
                filelist.append(path + '/' + file)
    return filelist


class AnomalyDetectionPrediction(object):

    def __init__(self):
        print("Initializing")

    def predict(self, inputdir, outputdir, _features_names):
        print("Searching " + inputdir + " for data files to process")
        objects = walkfiles(inputdir)
        files_to_process = len(objects)
        print(f"There are {files_to_process} files to load")

        if not files_to_process:
            print("Model unavailable! Exiting...")
            return

        for key in objects:
            if key.endswith('/frame_clean.pkl'):
                frame_clean = joblib.load(key)
            elif key.endswith('/model.pkl'):
                model = joblib.load(key)

        print(f"Generating Results: {datetime.datetime.now()}")
        # get all the anomalies and model as a pandas DataFrame
        anomalies = list(filter(lambda x: "anomalous_features" in x, model))

        # frame that contains only anomalies
        frame_anomalies = pd.DataFrame.from_records(anomalies).set_index("system_id")

        anomalies_json = outputdir + "/" + 'anomalies.json'
        frame_anomalies.to_json(anomalies_json, orient='records', lines=True)

        # join the anomalous records to the entire dataset
        account_and_system_id = pd.DataFrame.from_records(anomalies).set_index(["account", "system_id"])

        joined = frame_clean.join(account_and_system_id)
        joined["is_anomalous"] = joined["is_anomalous"].fillna(False)

        # aggregate values based on whether they were enriched or not
        agg = joined.groupby("is_anomalous").mean().fillna(1).T

        print(f"Generating Plot: {datetime.datetime.now()}")
        # compute the log-2 fold change ro help gauge magnitude of enrichment
        values = np.log2((agg[True] / agg[False])).sort_values(ascending=False).dropna()
        values.plot(kind="bar")
        plt.ylabel("log-2 fold change")
        plt.savefig(outputdir + "/" + 'plot.png')

        print(f"Results done! {datetime.datetime.now()}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-inputdir',
                        help='location of input data',
                        default=os.environ.get("INPUT_DIR", "/opt/app-root/src/data"))
    parser.add_argument('-outputdir',
                        help='location of output data',
                        default=os.environ.get("OUTPUT_DIR", "/mnt/vol"))
    args = parser.parse_args()
    obj = AnomalyDetectionPrediction()
    obj.predict(args.inputdir, args.outputdir, 20)


if __name__ == "__main__":
    main()

