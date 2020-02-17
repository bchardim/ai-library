import * as React from "react";
import { Grid } from "patternfly-react";
import { FLAKE_API_FULL_URL } from "../sagas";

function flakeWizardInfo() {
  const docUrl = "https://gitlab.com/opendatahub/ai-library/tree/master/";
  const apiUrl = FLAKE_API_FULL_URL;

  return (
    <div className="flake-wizard-contents flake-info">
      <Grid fluid={true}>
        <Grid.Row className="flake-info-section">
          <Grid.Col md={12}>
            <h1>Flake Analysis</h1>
            <p>Flake analysis aims to identify "flakes", or unreliable false positives, among failures in a testing
              system. By analyzing past failures, and whether or not they were ignored, we can train a machine
              model to recognize similar failures that should be ignored.</p>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className="flake-info-section">
          <Grid.Col xs={12}>
            <h1>The API</h1>
            <p>Documentation: <a href={docUrl + "/flake_analysis"} target="_blank" rel="noopener noreferrer"><span>{docUrl + "/flake_analysis"}</span></a></p>
            <p>API Endpoint: <a href={apiUrl} target="_blank" rel="noopener noreferrer"><span>{apiUrl}</span></a></p>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </div>);
}

export default flakeWizardInfo;
