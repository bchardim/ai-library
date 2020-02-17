import React, { useState } from "react";
import { TableGrid } from "patternfly-react-extensions";
import { Button, Tab, Tabs } from "patternfly-react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

import { createFlakePredictionList } from "../actions";
import { predictionData } from "./sampleData";
import generateCurl from "../../utilities/generateCurl";
import CodeSample from "../../CodeSample";
import { createFlakePredictionBody, FLAKE_API_FULL_URL } from "../sagas";
import FlakeProbability from "./FlakeProbability";
import ApiRequestExample from "../../ApiRequestExample";

const indexColSizes = {
  sm: 1
};
const logColSizes = {
  sm: 9
};
const flakeColSizes = {
  sm: 2
};

function FlakeWizardDemoPresets({predictionList, predictionPending, createFlakePredictionList}) {
  const [selectedIndex, updateSelectedIndex] = useState(1);
  const [tabActiveKey, updateTabActiveKey] = useState(0);

  function onSelect(index) {
    updateSelectedIndex(index);
  }

  function onSubmit() {
    createFlakePredictionList(predictionData);
  }

  function renderItemRow(item) {
    return (
      <TableGrid.Row
        key={item.index}
        onClick={() => onSelect(item.index)}
        selected={selectedIndex === item.index}
      >
        <TableGrid.Col {...indexColSizes}>{item.index}</TableGrid.Col>
        <TableGrid.Col {...logColSizes}>{item.log}</TableGrid.Col>
        <TableGrid.Col {...flakeColSizes}><FlakeProbability prediction={item} spinnerSize="xs"/></TableGrid.Col>
      </TableGrid.Row>
    );
  }

  function renderApiExample(selectedPrediction) {
    let curlCommand = generateCurl("POST", FLAKE_API_FULL_URL, "", createFlakePredictionBody(selectedPrediction.log));
    const response = get(selectedPrediction, "predictionResponse.data");

    return(
      <ApiRequestExample
        curlCommand={curlCommand}
        pending={selectedPrediction.predictionPending}
        response={response}
        error={selectedPrediction.predictionError}
      />
    );
  }

  function renderDetail(selectedPrediction) {
    if (isEmpty(predictionList) && !predictionPending) {
      return <div className="flake-presets-results"/>;
    }

    if (!selectedPrediction) {
      return <div className="flake-presets-results"/>;
    }

    return (
      <Tabs
        activeKey={tabActiveKey}
        onSelect={updateTabActiveKey}
        animation={false}
        id="RegressionPredictionTabs"
        className="flake-presets-results"
      >
        <Tab eventKey={0} title="Results">
          <h2>Flake Probability: <FlakeProbability prediction={selectedPrediction} spinnerSize="sm"/></h2>
          <CodeSample title="Log" code={selectedPrediction.log} language="plaintext"/>
        </Tab>
        <Tab eventKey={1} title="API">
          {renderApiExample(selectedPrediction)}
        </Tab>
      </Tabs>);
  }

  const gridItems = isEmpty(predictionList)
    ? predictionData.map((log, index) => ({index:  index + 1, log}))
    : predictionList.map((prediction, index) => ({index:  index + 1, ...prediction}));

  return (
    <>
      <TableGrid className="flake-results-table-grid" bordered={true} selectType={"row"}>
        <TableGrid.Head>
          <TableGrid.ColumnHeader {...indexColSizes}>#</TableGrid.ColumnHeader>
          <TableGrid.ColumnHeader {...logColSizes}>Log</TableGrid.ColumnHeader>
          <TableGrid.ColumnHeader {...flakeColSizes}>Flake</TableGrid.ColumnHeader>
        </TableGrid.Head>
        <TableGrid.Body>{gridItems.map(item => renderItemRow(item))}</TableGrid.Body>
      </TableGrid>
      <Button
        type="button"
        bsStyle="primary"
        onClick={onSubmit}
      >Submit</Button>
      {renderDetail(gridItems.find(p => p.index === selectedIndex))}
    </>
  );
}

function mapStateToProps(state) {
  return {
    ...state.flakeReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createFlakePredictionList: (logList) => {
      dispatch(createFlakePredictionList(logList));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FlakeWizardDemoPresets);
