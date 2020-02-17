export const RESET_FLAKE = "Flake.RESET_FLAKE";
export const resetFlake = () => ({
  type: RESET_FLAKE,
  payload: {}
});

export const CREATE_FLAKE_PREDICTION_LIST = "Flake.CREATE_FLAKE_PREDICTION_LIST";
export const createFlakePredictionList = (logList) => ({
  type: CREATE_FLAKE_PREDICTION_LIST,
  payload: {logList}
});

export const CREATE_FLAKE_PREDICTION_LIST_PENDING = "Flake.CREATE_FLAKE_PREDICTION_LIST_PENDING";
export const createFlakePredictionListPending = (predictionList) => ({
  type: CREATE_FLAKE_PREDICTION_LIST_PENDING,
  payload: {predictionList}
});

export const CREATE_FLAKE_PREDICTION_LIST_FULFILLED = "Flake.CREATE_FLAKE_PREDICTION_LIST_FULFILLED";
export const createFlakePredictionsFulfilled = (index, response) => ({
  type: CREATE_FLAKE_PREDICTION_LIST_FULFILLED,
  payload: {}
});

export const CREATE_FLAKE_PREDICTION_LIST_ITEM_PENDING = "Flake.CREATE_FLAKE_PREDICTION_LIST_ITEM_PENDING";
export const createFlakePredictionListItemPending = (index, log) => ({
  type: CREATE_FLAKE_PREDICTION_LIST_ITEM_PENDING,
  payload: {index, log}
});

export const CREATE_FLAKE_PREDICTION_LIST_ITEM_FULFILLED = "Flake.CREATE_FLAKE_PREDICTION_LIST_ITEM_FULFILLED";
export const createFlakePredictionListItemFulfilled = (index, response) => ({
  type: CREATE_FLAKE_PREDICTION_LIST_ITEM_FULFILLED,
  payload: {index, response}
});

export const CREATE_FLAKE_PREDICTION_LIST_ITEM_REJECTED = "Flake.CREATE_FLAKE_PREDICTION_LIST_ITEM_REJECTED";
export const createFlakePredictionListItemRejected = (index, error) => ({
  type: CREATE_FLAKE_PREDICTION_LIST_ITEM_REJECTED,
  payload: {index, error}
});

export const CREATE_CUSTOM_FLAKE_PREDICTION = "Flake.CREATE_CUSTOM_FLAKE_PREDICTION";
export const createCustomFlakePrediction = (log) => ({
  type: CREATE_CUSTOM_FLAKE_PREDICTION,
  payload: {log}
});

export const CREATE_CUSTOM_FLAKE_PREDICTION_PENDING = "Flake.CREATE_CUSTOM_FLAKE_PREDICTION_PENDING";
export const createCustomFlakePredictionPending = (log) => ({
  type: CREATE_CUSTOM_FLAKE_PREDICTION_PENDING,
  payload: {log}
});

export const CREATE_CUSTOM_FLAKE_PREDICTION_FULFILLED = "Flake.CREATE_CUSTOM_FLAKE_PREDICTION_FULFILLED";
export const createCustomFlakePredictionFulfilled = (response) => ({
  type: CREATE_CUSTOM_FLAKE_PREDICTION_FULFILLED,
  payload: {response}
});

export const CREATE_CUSTOM_FLAKE_PREDICTION_REJECTED = "Flake.CREATE_CUSTOM_FLAKE_PREDICTION_REJECTED";
export const createCustomFlakePredictionRejected = (error) => ({
  type: CREATE_CUSTOM_FLAKE_PREDICTION_REJECTED,
  payload: {error}
});
