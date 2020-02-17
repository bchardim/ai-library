import axios from "axios"
import { call, put, takeLatest } from 'redux-saga/effects';
import { createAxiosErrorNotification } from "../Notifications";
import {
  CREATE_REGRESSION_PREDICTION,
  createRegressionPredictionPending,
  createRegressionPredictionFulfilled,
  createRegressionPredictionRejected
} from "./actions";

let baseUrl = "http://host:port/";
if (window) {
  baseUrl = `${window.location.protocol}//${window.location.host}`;
}

export const REGRESSOR_ENDPOINT = "/seldon-models/regressor";
export const REGRESSOR_API_PATH = "/api/v0.1/predictions";

let regressorApiUrl, regressorApiFullUrl;
if (process.env.NODE_ENV === "development" && process.env.REACT_APP_DEV_REGRESSOR_URL) {
  regressorApiUrl = `${process.env.REACT_APP_DEV_REGRESSOR_URL}${REGRESSOR_API_PATH}`;
  regressorApiFullUrl = regressorApiUrl;
} else {
  regressorApiUrl = `${REGRESSOR_ENDPOINT}${REGRESSOR_API_PATH}`;
  regressorApiFullUrl = new URL(regressorApiUrl, baseUrl).href;
}

export const REGRESSOR_URL = regressorApiUrl;
export const REGRESSOR_API_FULL_URL = regressorApiFullUrl;
export const REGRESSOR_MODEL_PATH = "sample-models/healthpredictor/model.pkl";

export function createRegressionPredictionBody(height, weight) {
  return {"strData": `model=${REGRESSOR_MODEL_PATH}, data=${height}:${weight}`};
}

function* create(action) {
  yield put(createRegressionPredictionPending(action.payload.height, action.payload.weight));
  try {
    const response = yield call(axios.post, REGRESSOR_URL, createRegressionPredictionBody(action.payload.height, action.payload.weight));
    yield put(createRegressionPredictionFulfilled(response));
  } catch (error) {
    yield put(createAxiosErrorNotification(error));
    yield put(createRegressionPredictionRejected(error));
  }
}

export function* watchCreateRegressionPrediction() {
  yield takeLatest(CREATE_REGRESSION_PREDICTION, create);
}

export default [
  watchCreateRegressionPrediction()
];

