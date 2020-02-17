import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Wizard } from "patternfly-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import scrollToSelector from "../../utilities/scrollToSelector";
import ServiceTile from "../../ServiceTile";
import RegressionWizardInfo from "./RegressionWizardInfo";
import RegressionWizardDemo from "./RegressionWizardDemo";
import RegressionWizardHowTo from "./RegressionWizardHowTo";
import { resetRegressionPrediction } from "../actions";

import "./RegressionCard.scss";


function RegressionCard({resetRegressionPrediction}) {
  const [showModal, updateShowModal] = useState(false);
  const [activeStepIndex, updateActiveStepIndex] = useState(0);


  useEffect(() => {
    scrollToSelector(".wizard-pf-main", 0, 0);
  }, [activeStepIndex]);

  function openWizard() {
    resetRegressionPrediction();
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
        <RegressionWizardInfo/>
      )
    },
    {
      title: "Demo", render: () => (
        <RegressionWizardDemo/>
      )
    },
    {
      title: "How To", render: () => (
        <RegressionWizardHowTo/>
      )
    }
  ];

  const onWizardStepChange = newStepIndex => updateActiveStepIndex(newStepIndex);

  return (
    <div>
      <ServiceTile
        key="tile-regression"
        title="Regression"
        featured={true}
        faIcon="chart-line"
        description="Use my data to predict future outcomes and values"
        onClick={onClick}
      />
      <Wizard.Pattern
        className="regression-wizard service-wizard"
        show={showModal}
        backdrop="static"
        onHide={closeWizard}
        onExited={closeWizard}
        title={<span className="modal-title"><FontAwesomeIcon icon="chart-line" /> Linear Regression</span>}
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
    resetRegressionPrediction: () => {
      dispatch(resetRegressionPrediction());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegressionCard);
