import * as React from "react";
import { Grid } from "patternfly-react";
import JsonSample from "../../JsonSample";


const failureExample = {
  "id": "041f6832-aa14-4f6e-891d-31aaf8d7ed01",
  "status": "failure",
  "pull": 7330,
  "log": "I am a valid test failure, not a flake",
  "test": "Test Failure",
  "context": "verify/debian-testing",
  "date": "2017-07-19T11:56:01Z",
  "merged": false,
  "revision": "b32635869b9e87cdd9e42b6e6123150d500f6862"
};

const flakeExample = {
  "id": "1ffe2301-16cd-4313-bb2f-c0815e37fcba",
  "status": "failure",
  "pull": 7331,
  "log": "Flake.  I should be ignored.  I've been merged",
  "test": "Test Flake",
  "context": "verify/debian-testing",
  "date": "2017-07-19T11:56:01Z",
  "merged": true,
  "revision": "b32635869b9e87cdd9e42b6e6123150d500f6862"
};

function FlakeWizardTrainingData() {
  return (
    <div className="flake-wizard-contents flake-training-data">
      <Grid fluid={true}>
        <Grid.Row className="flake-info-section">
          <Grid.Col md={12}>
            <h2>Uploading Training Data</h2>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className="flake-info-section">
          <Grid.Col md={12}>
            <p>The training data consists of json representations of the logs that contain both meaningful test
              failures as well as failures that were "flakes" that can be ignored. When submitting test data, mark
              failures as either <code>merged: true</code> for flakes or <code>merged: false</code> for valid test
              failures.  All of the json files in a single "directory" or prefix in your S3 store will processed by the
              training job.
            </p>
            <JsonSample title="failure.json - Meaningful Test Failure"
                        object={failureExample}/>
            <JsonSample title="flake.json - Unimportant Test Failure (Flake)"
                        object={flakeExample}/>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </div>);
}

export default FlakeWizardTrainingData;
