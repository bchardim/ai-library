import * as React from "react";
import Plot from "react-plotly.js";
import { modelData, plotSettings, trainingData } from "./MockGraph";
import { Grid } from "patternfly-react";
import { REGRESSOR_API_FULL_URL } from "../sagas";

function RegressionWizardInfo() {
  const docUrl = "https://gitlab.com/opendatahub/ai-library/tree/master/";
  const apiUrl = REGRESSOR_API_FULL_URL;

  return (
    <div className="regression-wizard-contents regression-info">
      <Grid fluid={true}>
        <Grid.Row className="regression-info-section">
          <Grid.Col md={6}>
            <h1 className="wizard-pane-title">Linear Regression</h1>
            <p>Linear regression is an approach to modeling the relationship
              between a dependent variable and one or more independent variables. It is often used to try and
              predict or forecast a value of the dependent variable using the independent variables.</p>
            <p>The AI Library contains 3 sample models using linear regression models: <strong>Health Predictor,
              Risk Analysis, and Fraud Detection.</strong></p>
            <p>As a useful and common technique, this example is one of the easiest ways to get started making
              your own AI Library endpoints.</p>
          </Grid.Col>
          <Grid.Col md={6}>
            <div className="info-graph-container">
              <Plot data={[trainingData, modelData]} {...plotSettings} />
            </div>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className="regression-info-section">
          <Grid.Col xs={12}>
            <h1>The API</h1>
            <p>Linear Regression Documentation:
              <a href={docUrl + "/linear_regression"} target="_blank" rel="noopener noreferrer"><span>{docUrl + "/linear_regression"}</span></a></p>
            <p>Fraud Detection Documentation:
              <a href={docUrl + "/fraud_detection"} target="_blank" rel="noopener noreferrer"><span>{docUrl + "/fraud_detection"}</span></a></p>
            <p>API Endpoint: <a href={apiUrl} target="_blank" rel="noopener noreferrer"><span>{apiUrl}</span></a></p>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </div>);
}

export default RegressionWizardInfo;
