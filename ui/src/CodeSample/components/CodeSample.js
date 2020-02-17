import React, { useState } from "react";
import { Icon } from "patternfly-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SyntaxHighlighter from "react-syntax-highlighter";
import ghg from "react-syntax-highlighter/dist/esm/styles/hljs/github-gist";

import "./CodeSample.scss";

function CodeSample({title, code, language}) {
  const [showCode, updateShowCode] = useState(true);

  function toggleDetails() {
    updateShowCode(!showCode);
  }

  const toggleDetailsText = showCode
    ? <span><Icon type="fa" name="chevron-down"/> Hide</span>
    : <span><Icon type="fa" name="chevron-right"/> Show</span>;

  const codeSection = showCode
    ? <SyntaxHighlighter language={language} style={ghg}>{code}</SyntaxHighlighter>
    : "";

  return (
    <div className="code-sample code-sample-section">
      <div className="code-sample-heading">
        <h4 className="code-sample-title">{title}</h4>
        <CopyToClipboard text={code}>
          <a className="clickable-empty-link code-sample-action"><Icon type="fa" name="copy"/> Copy</a>
        </CopyToClipboard>
        <a className="clickable-empty-link code-sample-action" onClick={toggleDetails}>{toggleDetailsText}</a>
      </div>
      {codeSection}
    </div>
  );
}

export default CodeSample;

