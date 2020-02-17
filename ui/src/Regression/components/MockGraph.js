import times from "lodash/times";
import range from "lodash/range";

const variance = 30;
function formula(x) {
  return 0.5 * x + 15;
}

function generateTrainingData(min, max) {
  const x = times(max, x => x + Math.floor(Math.random() * Math.floor(variance) - (variance / 2)));
  const y = times(max, x => formula(x) + Math.floor(Math.random() * Math.floor(variance) - (variance / 2)));
  return ({
    x,
    y,
    mode: "markers",
    name: "Training Data",
    marker: {
      color: "rgb(57,165,220)"
    }
  });
}

function generateLine(min, max) {
  const x = range(-variance, max + variance);
  const y = x.map(formula);
  return ({
    x,
    y,
    mode: "lines",
    name: "Model Predictions",
    line: {
      color: "rgb(247,189,127)",
      // color: "rgb(255,174,56)",
      width: 3
    }
  });
}

export const trainingData = generateTrainingData(0, 100);
export const modelData = generateLine(0, 100);
export const plotSettings = {
  legend: {
    x: 0,
    y: -.3
  },
  layout: {
    // autosize: true,
    // height: undefined,
    // width: undefined,
    margin: {
      l: 0,
      r: 0,
      t: 0,
      b: 0
    },
    xaxis: {range: [-30, 130]},
    yaxis: {range: [0, 85]},
    legend: {
      x: 0,
      y: -.2
    },
    showlegend: true
  },
  style: {
    width: "100%",
    height: "100%"
  },
  useResizeHandler: true
};
