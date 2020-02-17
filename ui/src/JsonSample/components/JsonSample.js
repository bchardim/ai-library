import React, { useState } from "react";
import { Icon } from "patternfly-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactJson from "react-json-view";

import "./JsonSample.scss";

function JsonSample({initHidden, title, object, showArrayLimit}) {
  const [showJson, updateShowJson] = useState(!initHidden);

  function toggleDetails() {
    updateShowJson(!showJson);
  }

  function shouldCollapse(field) {
    const limit = showArrayLimit || 3;
    return field.type === "array" && field.src.length > limit;
  }

  const toggleDetailsText = showJson
    ? <span><Icon type="fa" name="chevron-down"/> Hide</span>
    : <span><Icon type="fa" name="chevron-right"/> Show</span>;

  const jsonSection = showJson
    ? <ReactJson
      name={false}
      enableClipboard={false}
      onEdit={false}
      onAdd={false}
      onDelete={false}
      displayDataTypes={false}
      collapseStringsAfterLength={120}
      shouldCollapse={field => shouldCollapse(field)}
      src={object}
    />
    : "";

  return (
    <div className="json-sample json-sample-section">
      <div className="json-sample-heading">
        <h4 className="json-sample-title">{title}</h4>
        <CopyToClipboard
          text={JSON.stringify(object, undefined, 2)}>
          <a className="clickable-empty-link json-sample-action"><Icon type="fa" name="copy"/> Copy</a>
        </CopyToClipboard>
        <a className="clickable-empty-link json-sample-action" onClick={toggleDetails}>{toggleDetailsText}</a>
      </div>
      {jsonSection}
    </div>
  );
}

export default JsonSample;

