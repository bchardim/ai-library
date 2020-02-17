import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, FormGroup, Grid } from "patternfly-react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import get from "lodash/get";

import generateCurl from "../../utilities/generateCurl";
import { createCustomFlakePrediction } from "../actions";
import { FLAKE_API_FULL_URL, createFlakePredictionBody } from "../sagas";
import { predictionData } from "./sampleData";
import ApiRequestExample from "../../ApiRequestExample";
import FlakeProbability from "./FlakeProbability";

const formSchema = Yup.object().shape({
  log: Yup.string().required()
});

function FlakeWizardDemoCustom({custom, createCustomFlakePrediction}) {
  const [initialLog, updateInitialLog] = useState(custom.log || "");

  function pasteSample(e, text) {
    e.preventDefault();
    updateInitialLog(text);
  }

  function apiExample() {
    let curlCommand = generateCurl("POST", FLAKE_API_FULL_URL, "", createFlakePredictionBody(custom.log));
    const response = get(custom, "predictionResponse.data");
    return (
      <ApiRequestExample
        curlCommand={curlCommand}
        pending={custom.predictionPending}
        response={response}
        error={custom.predictionError}
      />);
  }

  return (
    <>
      <Grid.Row>
        <Grid.Col xs={12}>
          Click
          <a className="clickable-empty-link"
             onClick={e => pasteSample(e, predictionData[0])}> here </a>
          to fill it out with a sample to modify. You can also
          <a className="clickable-empty-link" onClick={e => pasteSample(e, "")}> clear </a>
          the form and type in a bug of your own to run against the sample data.
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col lg={6}>
          <Formik
            enableReinitialize={true}
            initialValues={{log: initialLog || ""}}
            isInitialValid={!!initialLog}
            validationSchema={formSchema}
            onSubmit={(values, actions) => {
              createCustomFlakePrediction(values.log);
              actions.setSubmitting(false);
            }}
            render={({errors, isSubmitting, isValid}) => (
              <Form className="health-detector-form">
                <FormGroup controlId="heightField" validationState={errors.height ? "error" : "success"}>
                  <h3>Log of Test Failure</h3>
                  <Field className="form-control" component="textarea" name="log" rows="10" disabled={isSubmitting}/>
                </FormGroup>
                <div className="submit-button-container">
                  <Button type="submit" bsStyle="primary" disabled={isSubmitting || !isValid}>Submit</Button>
                </div>
              </Form>
            )}
          />
        </Grid.Col>
        <Grid.Col lg={6}>
          <h3>Probability of Flake:</h3>
          <div className="prediction-container">
            <div className="prediction-text">
              <FlakeProbability
                prediction={custom}
                spinnerSize="xl"
                empty={<span className="no-prediction">Submit a test failure log.</span>}
              />
            </div>
          </div>
        </Grid.Col>
      </Grid.Row>
      {apiExample()}
    </>
  );
}

function mapStateToProps(state) {
  return {
    ...state.flakeReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createCustomFlakePrediction: (log) => {
      dispatch(createCustomFlakePrediction(log));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FlakeWizardDemoCustom);
