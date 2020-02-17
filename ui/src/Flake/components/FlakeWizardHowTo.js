import * as React from "react";
import { Grid } from "patternfly-react";

function FlakeWizardHowTo() {
  return (
    <div className="flake-wizard-contents flake-how-to">
      <Grid fluid={true}>
        <Grid.Row className="flake-info-section">
          <Grid.Col md={12}>
            <h1>Deploy Your Own</h1>
            <p>This endpoint can be reused for your own custom models.  This requires access to the S3 store that AI
            Library uses.</p>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className="flake-info-section">
          <Grid.Col md={12}>
            <h3>Upload Training Data</h3>
            <p>First we need to upload training data from our own test results.  This will be used to train a model</p>
            <h3>Train a Model</h3>
            <p>Next, we can use JupyterHub to train a new model using our custom training data.</p>
            <h3>Request a Prediction</h3>
            <p>After generating a trained model, we can use this model in our API Requests to make predictions</p>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </div>);
}

export default FlakeWizardHowTo;
