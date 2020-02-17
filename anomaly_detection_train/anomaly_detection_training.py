from rad import rad
import logging
import argparse
import os
import pandas as pd
from datetime import datetime

import datetime
import joblib

logging.disable(logging.WARN)


def walkfiles(basedir):
    filelist = []
    for path, dirs, files in os.walk(basedir):
        for file in files:
            if os.path.isfile(path + '/' + file):
                filelist.append(path + '/' + file)
    return filelist


class AnomalyDetectionTraining(object):

    def __init__(self):
        print("Initializing")

    def train(self, inputdir, outputdir, _features_names):

        print("Searching " + inputdir + " for data files to process")
        objects = walkfiles(inputdir)
        print("There are " + str(len(objects)) + " files to load")

        frame = pd.DataFrame()
        for key in objects:
            if key.endswith('.csv'):
                df = pd.read_csv(key)
                frame = frame.append(df)
            elif key.endswith('.parquet'):
                df = pd.read_parquet(key)
                frame = frame.append(df)

        if frame.empty:
            print("No data found!")
            return

        print(f"Frame shape before preprocessing: {frame.shape}")
        frame_clean, mapping = rad.preprocess(frame,
                                              index=["account", "system_id"],
                                              drop="upload_time")

        # `preprocess` shaves-away some colums
        print(f"Frame shape after preprocessing: {frame_clean.shape}")

        # Include the original pre-processed frame as part of the output
        # required for plotting graphs in the prediction phase
        frame_clean_output =  outputdir + "/" + 'frame_clean.pkl'
        joblib.dump(frame_clean, frame_clean_output)
        print(f"Saved preprocessed dataframe : {frame_clean_output}")

        try:
            forest = rad.RADIsolationForest(behaviour="new", contamination=0.1, n_estimators=150)
            print(f"Training Start Time: {datetime.datetime.now()}")
            predictions = forest.fit_predict_contrast(frame_clean, training_frame=frame_clean)
            print(f"Training End Time: {datetime.datetime.now()}")
            print("Training complete!")
            filename = outputdir + "/" + 'model.pkl'
            joblib.dump(predictions, filename)
            print(f"Model created : {filename}")
        except Exception as e:
            print("Exception : " + e)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-inputdir',
                        help='location of input data',
                        default=os.environ.get("INPUT_DIR", "/opt/app-root/src/data"))
    parser.add_argument('-outputdir',
                        help='location of output data',
                        default=os.environ.get("OUTPUT_DIR", "/mnt/vol"))
    args = parser.parse_args()
    obj = AnomalyDetectionTraining()
    obj.train(args.inputdir, args.outputdir, 20)


if __name__ == "__main__":
    main()

