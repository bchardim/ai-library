import * as React from "react";
import { Grid } from "patternfly-react";
import CodeSample from "../../CodeSample";

const trainingVars = (
`# SET PARAMETERS TO ACCESS S3
s3Path = 'prefix/training/records'
s3Destination = 'prefix/sample.model'
s3endpointUrl = 'http://s3.host:port/'
s3objectStoreLocation = 'MY-BUCKET'
s3accessKey = 'accessKey'
s3secretKey = 'secretKey'
`);

function FlakeWizardTraining() {
  return (
    <div className="flake-wizard-contents flake-training">
      <Grid fluid={true}>
        <Grid.Row className="flake-info-section">
          <Grid.Col md={12}>
            <h2>Training a Model</h2>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className="flake-info-section">
          <Grid.Col md={12}>
            <p>Using the previously uploaded training data, the model can be trained using a Jupyter notebook supplied
              with the AI Library.  You can spawn in instance in JupyterHub which is also installed with Open Data Hub
              or you can use any Jupyter installation with access to the AI Library storage.
            </p>
            <p>Download and edit the notebook and files.  From a JupyterHub terminal you can clone the AI Library,
              <code>git clone https://gitlab.com/opendatahub/ai-library</code> and edit the file
              <code>ai-library/flakes_train/training.ipynb</code>.  Update the S3 variables to match your S3 settings
              and the output model filename you will use.
            </p>
            <CodeSample title="ai-library/flakes_train/training.ipynb" code={trainingVars} language="python"/>
            <p>Run the notebook and remember of the output location, (e.g. <code>prefix/sample.model</code>)
            </p>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </div>);
}

export default FlakeWizardTraining;
