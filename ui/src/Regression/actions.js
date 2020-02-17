export const RESET_REGRESSION_PREDICTION = "Regression.RESET_REGRESSION_PREDICTION";
export const resetRegressionPrediction = () => ({
  type: RESET_REGRESSION_PREDICTION,
  payload: {}
});

export const CREATE_REGRESSION_PREDICTION = "Regression.CREATE_REGRESSION_PREDICTION";
export const createRegressionPrediction = (height, weight) => ({
  type: CREATE_REGRESSION_PREDICTION,
  payload: {height, weight}
});

export const CREATE_REGRESSION_PREDICTION_PENDING = "Regression.CREATE_REGRESSION_PREDICTION_PENDING";
export const createRegressionPredictionPending = (height, weight) => ({
  type: CREATE_REGRESSION_PREDICTION_PENDING,
  payload: {height, weight}
});


export const CREATE_REGRESSION_PREDICTION_FULFILLED = "Regression.CREATE_REGRESSION_PREDICTION_FULFILLED";
export const createRegressionPredictionFulfilled = (response) => ({
  type: CREATE_REGRESSION_PREDICTION_FULFILLED,
  payload: {
    response
  }
});

export const CREATE_REGRESSION_PREDICTION_REJECTED = "Regression.CREATE_REGRESSION_PREDICTION_REJECTED";
export const createRegressionPredictionRejected = (error) => ({
  type: CREATE_REGRESSION_PREDICTION_REJECTED,
  payload: {
    error
  }
});
