import * as React from "react";
import Plot from "react-plotly.js";
import { trainingData, modelData, plotSettings } from "./MockHealthData";

function RegressionWizardModel() {
  return (
    <div className="regression-wizard-contents regression-demo">
      <h2 className="wizard-pane-title">The Model</h2>
      <p className="lead-description">Now, to build a prediction model. As before, the training data appears in blue.
        The predictions appear here in green and take the form of a plane in 3D space.</p>
      <div className="graph-container">
        <Plot data={[trainingData, modelData]} {...plotSettings} />
      </div>
    </div>
  );
}

export default RegressionWizardModel;
