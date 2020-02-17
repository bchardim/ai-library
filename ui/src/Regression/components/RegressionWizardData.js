import * as React from "react";
import Plot from "react-plotly.js";
import { trainingData, plotSettings } from "./MockHealthData";

function RegressionWizardData() {

  return (
    <div className="regression-wizard-contents regression-demo">
      <h2 className="wizard-pane-title">Training Data (Health Predictor)</h2>
      <p className="lead-description">In the previous example, there was only one independent variable.  Often there can
      be many.  Here's an example with 2 dependent variables.</p>
      <div className="graph-container">
        <Plot data={[trainingData]} {...plotSettings}/>
      </div>
    </div>
  );
}

export default RegressionWizardData;
