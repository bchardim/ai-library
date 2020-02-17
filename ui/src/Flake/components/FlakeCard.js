import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Wizard } from "patternfly-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import scrollToSelector from "../../utilities/scrollToSelector";
import ServiceTile from "../../ServiceTile";
import FlakeWizardInfo from "./FlakeWizardInfo";
import FlakeWizardDemo from "./FlakeWizardDemo";
import FlakeWizardHowTo from "./FlakeWizardHowTo";
import FlakeWizardTrainingData from "./FlakeWizardTrainingData";
import FlakeWizardTraining from "./FlakeWizardTraining";
import FlakeWizardPrediction from "./FlakeWizardPrediction";
import { resetFlake } from "../actions";

import "./FlakeCard.scss";


function FlakeCard({resetFlakePrediction}) {
  const [showModal, updateShowModal] = useState(false);
  const [activeStepIndex, updateActiveStepIndex] = useState(0);

  useEffect(() => {
    scrollToSelector(".wizard-pf-main", 0, 0);
  }, [activeStepIndex]);

  function openWizard() {
    resetFlakePrediction();
    updateActiveStepIndex(0);
    updateShowModal(true);
  }

  function closeWizard() {
    updateShowModal(false);
  }

  function onClick(e) {
    e.preventDefault();
    openWizard();
  }

  const wizardSteps = [
    {
      title: "Introduction", render: () => (
        <FlakeWizardInfo/>
      )
    },
    {
      title: "Demo", render: () => (
        <FlakeWizardDemo/>
      )
    },
    {
      title: "How To", render: () => (
        <FlakeWizardHowTo/>
      )
    },
    {
      title: "Training Data", render: () => (
        <FlakeWizardTrainingData/>
      )
    },
    {
      title: "Model", render: () => (
        <FlakeWizardTraining/>
      )
    },
    {
      title: "Prediction", render: () => (
        <FlakeWizardPrediction/>
      )
    }
  ];

  const onWizardStepChange = newStepIndex => updateActiveStepIndex(newStepIndex);

  return (
    <div>
      <ServiceTile
        key="tile-flake"
        title="Flake Analysis"
        featured={true}
        faIcon="snowflake"
        description="Identify test failures that can be ignored"
        onClick={onClick}
      />
      <Wizard.Pattern
        className="flake-wizard service-wizard"
        show={showModal}
        backdrop="static"
        onHide={closeWizard}
        onExited={closeWizard}
        title={<span className="modal-title"><FontAwesomeIcon icon="snowflake" /> Flake Analysis</span>}
        nextStepDisabled={false}
        steps={wizardSteps}
        onStepChanged={onWizardStepChange}
        loading={false}
        activeStepIndex={activeStepIndex}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    resetFlakePrediction: () => {
      dispatch(resetFlake());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FlakeCard);
