import get from "lodash/get";

import {
  RESET_FLAKE,
  CREATE_FLAKE_PREDICTION_LIST_FULFILLED,
  CREATE_FLAKE_PREDICTION_LIST_PENDING,
  CREATE_FLAKE_PREDICTION_LIST_ITEM_PENDING,
  CREATE_FLAKE_PREDICTION_LIST_ITEM_FULFILLED,
  CREATE_FLAKE_PREDICTION_LIST_ITEM_REJECTED,
  CREATE_CUSTOM_FLAKE_PREDICTION_PENDING,
  CREATE_CUSTOM_FLAKE_PREDICTION_FULFILLED,
  CREATE_CUSTOM_FLAKE_PREDICTION_REJECTED
} from "./actions";

const initialState = {
  custom: {},
  predictionList: [],
  predictionPending: false,
};

export const flakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FLAKE:
      return initialState;
    case CREATE_FLAKE_PREDICTION_LIST_PENDING:
      return {
        ...state,
        predictionList: get(action, "payload.predictionList"),
        predictionPending: true,
      };
    case CREATE_FLAKE_PREDICTION_LIST_FULFILLED:
      return {
        ...state,
        predictionPending: false,
      };
    case CREATE_FLAKE_PREDICTION_LIST_ITEM_PENDING:
      return {
        ...state,
        predictionList: updatePredictionList(
          state.predictionList,
          get(action, "payload.index"),
          {predictionPending: true}
        )
      };
    case CREATE_FLAKE_PREDICTION_LIST_ITEM_FULFILLED:
      return {
        ...state,
        predictionList: updatePredictionList(
          state.predictionList,

          get(action, "payload.index"),
          {
            predictionPending: false,
            flake: parseFloat(get(action, "payload.response.data.strData")),
            predictionResponse: get(action, "payload.response")
          }
        )
      };
    case CREATE_FLAKE_PREDICTION_LIST_ITEM_REJECTED:
      return {
        ...state,
        predictionList: updatePredictionList(
          state.predictionList,
          get(action, "payload.index"),
          {
            predictionPending: false,
            predictionError: get(action, "payload.error")
          }
        )
      };

    case CREATE_CUSTOM_FLAKE_PREDICTION_PENDING:
      return {
        ...state,
        custom: {
          log:  action.payload.log,
          predictionPending: true
        }
      };
    case CREATE_CUSTOM_FLAKE_PREDICTION_FULFILLED:
      return {
        ...state,
        custom: {
          log: state.custom.log,
          flake: parseFloat(get(action, "payload.response.data.strData")),
          predictionPending: false,
          predictionResponse: get(action, "payload.response")
        }
      };
    case CREATE_CUSTOM_FLAKE_PREDICTION_REJECTED:
      return {
        ...state,
        custom: {
          log: state.custom.log,
          flake: null,
          predictionPending: false,
          predictionError: get(action, "payload.error")
        }
      };
    default:
      return state;
  }
};

function updatePredictionList(predictionList, index, updatedFields) {
  return [
    ...predictionList.slice(0, index),
    {...predictionList[index], ...updatedFields},
    ...predictionList.slice(index + 1)
  ];
}

