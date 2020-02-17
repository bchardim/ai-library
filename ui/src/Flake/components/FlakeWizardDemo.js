import React, { useState } from "react";
import { FormGroup, Grid, Radio} from "patternfly-react";
import { resetFlake } from "../actions";

import FlakeWizardDemoPresets from "./FlakeWizardDemoPresets";
import FlakeWizardDemoCustom from "./FlakeWizardDemoCustom";


function FlakeWizardDemo() {

  const [radioInput, updateRadioInput] = useState("preset");

  function renderForm() {
    if (radioInput === "custom") {
      return <FlakeWizardDemoCustom/>;
    }

    return <FlakeWizardDemoPresets/>;
  }

  function onRadioInputChanged(e) {
    resetFlake();
    updateRadioInput(e.currentTarget.value);
  }

  return (
    <div className="flake-wizard-contents flake-demo">
      <Grid fluid={true}>
        <Grid.Row className="flake-info-section">
          <Grid.Col xs={12}>
            <h1 className="wizard-pane-title">Live Demo</h1>
            <form>
              <FormGroup>
                <Radio name="inputTypeRadioGroup" checked={radioInput === "preset"} value="preset" onChange={onRadioInputChanged}>
                  Preset - use preset test failure logs
                </Radio>
                <Radio name="inputTypeRadioGroup" checked={radioInput === "custom"} value="custom" onChange={onRadioInputChanged}>
                  Custom - create your own log
                </Radio>
              </FormGroup>
            </form>
          </Grid.Col>
        </Grid.Row>
        {renderForm()}
      </Grid>
    </div>
  );
}

export default FlakeWizardDemo;
