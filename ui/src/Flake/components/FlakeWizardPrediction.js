import * as React from "react";
import { Grid } from "patternfly-react";
import generateCurl from "../../utilities/generateCurl";
import { createFlakePredictionBody, FLAKE_API_FULL_URL } from "../sagas";
import ApiRequestExample from "../../ApiRequestExample";

let curlCommand = generateCurl("POST", FLAKE_API_FULL_URL, "", createFlakePredictionBody("new log", "prefix/sample.model"));

const response = {
  "meta": {
    "puid": "qjmaohi8b17jijt5dramkit8ns",
    "tags": {},
    "routing": {},
    "requestPath": {
      "c-predictflakes": "docker.io/panbalag/flakes_predict"
    },
    "metrics": []
  },
  "strData": "0.333"
};

function FlakeWizardTraining() {
  return (
    <div className="flake-wizard-contents flake-prediction">
      <Grid fluid={true}>
        <Grid.Row className="flake-info-section">
          <Grid.Col md={12}>
            <h2>Requesting a Prediction</h2>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className="flake-info-section">
          <Grid.Col md={12}>
            <p>After creating a new model, you request a prediction with the path to the newly created model and
              a new test failure log to predict whether or not the result is a flake or a genuine failure.
            </p>
            <ApiRequestExample
              curlCommand={curlCommand}
              pending={false}
              response={response}
              error={null}
            />
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </div>);
}

export default FlakeWizardTraining;
