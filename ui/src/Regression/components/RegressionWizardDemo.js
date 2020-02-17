import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, ControlLabel, FormGroup, Grid, Tabs, Tab } from "patternfly-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Plot from "react-plotly.js";

import AxiosError from "../../AxiosError";
import generateCurl from "../../utilities/generateCurl";

import { modelData, trainingData, plotSettings } from "./MockHealthData";
import { createRegressionPredictionBody, REGRESSOR_API_FULL_URL } from "../sagas";
import {createRegressionPrediction} from "../actions"
import get from "lodash/get";
import ApiRequestExample from "../../ApiRequestExample";


const formSchema = Yup.object().shape({
  height: Yup.number().required().positive(),
  weight: Yup.number().required().positive()
});

function RegressionWizardDemo(
  {
    height,
    weight,
    health,
    predictionPending,
    predictionResponse,
    predictionError,
    createRegressionPrediction
  }) {

  const [tabActiveKey, updateTabActiveKey] = useState(0);

  let resultData = {
    x: [],
    y: [],
    z: [],
    mode: "markers",
    name: "Result",
    marker: {
      color: "rgb(49,255,11)",
      size: 10
    },
    type: "scatter3d"
  };

  if (health) {
    resultData = {
      ...resultData,
      x: [height],
      y: [weight],
      z: [health]
    };
  }

  function apiExample() {
    if (!health && !predictionPending) {
      return (
        <Grid.Row>
          <Grid.Col className="sample-request-col" xs={12}>
            <div className="regression-demo-status alert alert-info alert-callout">
              <span className="pficon pficon-info"/> Submit a height and weight to see a request
            </div>
          </Grid.Col>
        </Grid.Row>);
    }

    let curlCommand = generateCurl("POST", REGRESSOR_API_FULL_URL, "", createRegressionPredictionBody(height, weight));
    const response = get(predictionResponse, "data");
    return (
      <ApiRequestExample
        curlCommand={curlCommand}
        pending={predictionPending}
        response={response}
      />);
  }

  function renderResults() {
    return (
      <Tabs
      activeKey={tabActiveKey}
      onSelect={updateTabActiveKey}
      animation={false}
      id="RegressionPredictionTabs"
      className="regression-demo-tab"
    >
      <Tab eventKey={0} title="Results">
        <div className="demo-graph-container">
          <Plot data={[trainingData, modelData, resultData]} {...plotSettings} />
        </div>
      </Tab>
      <Tab eventKey={1} title="API">
        {apiExample()}
      </Tab>
    </Tabs>);
  }

  return (
    <div className="regression-wizard-contents regression-demo">
      <Grid fluid={true}>
        <Grid.Row className="regression-info-section">
          <Grid.Col xs={12}>
            <h1 className="wizard-pane-title">Live Demo (Health Predictor)</h1>
            <p>In this demo, the health predictor a 2 dimensional linear regression.
              There are 2 independent variables, height and weight, to predict a dependent variable, health index,
              from 0 - 5. In this case, 2 being normal. Training data points are shown in blue graphed on a 3D graph.
              Height on X, Weight on Y, and Health Index on Z. The resulting linear regression model is graphed as a
              gray plane overlapping the training data. By submitting a height and weight, the model will predict a
              health index and render it in green.</p>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className="regression-info-section">
          <Grid.Col md={2}>
            <Formik
              initialValues={{height, weight}}
              isInitialValid={true}
              validationSchema={formSchema}
              onSubmit={(values, actions) => {
                createRegressionPrediction(values.height, values.weight);
                actions.setSubmitting(false);
              }}
              render={({errors, isSubmitting, isValid}) => (
                <Form className="health-detector-form">
                  <FormGroup controlId="heightField"  validationState={errors.height ? "error" : "success"}>
                    <ControlLabel>Height (inches)</ControlLabel>
                    <Field className="form-control" type="text" name="height" disabled={isSubmitting}/>
                  </FormGroup>
                  <FormGroup controlId="weightField" validationState={errors.weight ? "error" : "success"}>
                    <ControlLabel>Weight (lbs)</ControlLabel>
                    <Field className="form-control" type="text" name="weight" disabled={isSubmitting}/>
                  </FormGroup>
                  <Button type="submit" bsStyle="primary" disabled={isSubmitting || !isValid}>Submit</Button>
                  <FormGroup controlId="healthField" className="health-result-group">
                    <ControlLabel><FontAwesomeIcon icon="circle" className="health-index-icon"/> Health (0-5)</ControlLabel>
                    <p className="health-result">{
                      predictionPending ?
                      <span className="spinner spinner-xs spinner-inline"/> :
                      <span>{health}</span>}
                    </p>
                  </FormGroup>
                </Form>
              )}
            />
          </Grid.Col>
          <Grid.Col md={10}>
            {predictionError ? <AxiosError error={predictionError}/> : renderResults() }
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.regressionReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createRegressionPrediction: (height, weight) => {
      dispatch(createRegressionPrediction(height, weight));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegressionWizardDemo);
