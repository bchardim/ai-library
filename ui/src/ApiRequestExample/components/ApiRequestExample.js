import * as React from "react";
import { Grid } from "patternfly-react";
import CodeSample from "../../CodeSample";
import JsonSample from "../../JsonSample";
import AxiosError from "../../AxiosError";

import "./ApiRequestExample.scss";

function ApiRequestExample({curlCommand, pending, response, error}) {
  if (error) {
    return <AxiosError error={error}/>;
  }

  if (pending) {
    return (
      <Grid.Row className="api-request-example">
        <Grid.Col className="sample-request-col" lg={6}>
          <CodeSample title="Request" code={curlCommand} language="bash"/>
        </Grid.Col>
        <Grid.Col className="sample-response-col" lg={6}>
          <div className="alert alert-info">
            <span className="pficon pficon-spinner fa-spin"/> In Progress...
          </div>
        </Grid.Col>
      </Grid.Row>);
  }

  if (response) {
    return (
      <Grid.Row className="api-request-example">
        <Grid.Col className="sample-request-col" lg={6}>
          <CodeSample title="Request" code={curlCommand} language="bash"/>
        </Grid.Col>
        <Grid.Col className="sample-response-col" lg={6}>
          <JsonSample title="Response" object={response}/>
        </Grid.Col>
      </Grid.Row>);
  }

  return <div className="api-request-example"/>;
}

export default ApiRequestExample;

