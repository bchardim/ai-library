import get from "lodash/get";

import {
  RESET_REGRESSION_PREDICTION,
  CREATE_REGRESSION_PREDICTION_PENDING,
  CREATE_REGRESSION_PREDICTION_FULFILLED,
  CREATE_REGRESSION_PREDICTION_REJECTED
} from "./actions";


const initialState = {
  height: 66,
  weight: 150,
  health: null,
  predictionPending: false,
  predictionResponse: null,
  predictionError: null
};

export const regressionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_REGRESSION_PREDICTION:
      return initialState;
    case CREATE_REGRESSION_PREDICTION_PENDING:
      return {
        ...state,
        height: action.payload.height,
        weight: action.payload.weight,
        health: null,
        predictionPending: true,
        predictionResponse: null,
        predictionError: null
      };
    case CREATE_REGRESSION_PREDICTION_FULFILLED:
      return {
        ...state,
        health: get(action, "payload.response.data.data.tensor.values[0]"),
        predictionPending: false,
        predictionResponse: get(action, "payload.response"),
        predictionError: null
      };
    case CREATE_REGRESSION_PREDICTION_REJECTED:
      return {
        ...state,
        health: null,
        predictionPending: false,
        predictionResponse: null,
        predictionError: get(action, "payload.error"),
      };
    default:
      return state;
  }
};
