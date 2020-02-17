import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";

const FLAKE_MIN = 10;

function FlakeProbability({prediction, empty, spinnerSize}) {
  if (!prediction) {
    return <span className="flake-probability"/>;
  }

  if (prediction.predictionError) {
    return <span className="flake-probability flake-true"><FontAwesomeIcon icon="exclamation-triangle"/> Error</span>;
  }

  if (prediction.predictionPending) {
    let spinnerSizeClass = spinnerSize ? `spinner-${spinnerSize}`: "" ;
    let classNames = cx("flake-probability spinner spinner-inline", spinnerSizeClass);
    return <span className={classNames}/>;
  }

  const flakePercent = parseFloat(prediction.flake) * 100;
  if (flakePercent >= FLAKE_MIN) {
    return <span className="flake-probability flake-true"><FontAwesomeIcon icon="snowflake"/> {flakePercent.toFixed(2)}%</span>;
  }

  if (flakePercent < FLAKE_MIN) {
    return <span className="flake-probability flake-false"><FontAwesomeIcon icon="bug"/> {flakePercent.toFixed(2)}%</span>;
  }

  return empty ? empty : <span className="flake-probability"/>;
}

export default FlakeProbability;

