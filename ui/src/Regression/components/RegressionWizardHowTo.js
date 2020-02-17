import * as React from "react";
import { Grid } from "patternfly-react";

function RegressionWizardHowTo() {
  return (
    <div className="regression-wizard-contents regression-how-to">
      <Grid fluid={true}>
        <Grid.Row>
          <Grid.Col xs={12}>
            <div className="regression-info-section">
              <h2>Deploy Your Own</h2>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </div>);
}

export default RegressionWizardHowTo;
