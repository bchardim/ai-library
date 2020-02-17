import axios from "axios";
import { call, put, takeLatest } from 'redux-saga/effects';
import { createAxiosErrorNotification } from "../Notifications";
import {
  CREATE_FLAKE_PREDICTION_LIST,
  createFlakePredictionListPending,
  createFlakePredictionsFulfilled,
  createFlakePredictionListItemPending,
  createFlakePredictionListItemFulfilled,
  createFlakePredictionListItemRejected,
  CREATE_CUSTOM_FLAKE_PREDICTION,
  createCustomFlakePredictionPending,
  createCustomFlakePredictionFulfilled,
  createCustomFlakePredictionRejected
} from "./actions";

let baseUrl = "http://host:port/";
if (window) {
  baseUrl = `${window.location.protocol}//${window.location.host}`;
}

export const FLAKE_ENDPOINT = `/seldon-models/flake`;
export const FLAKE_API_PATH = `/api/v0.1/predictions`;

let flakeApiUrl, flakeApiFullUrl;
if (process.env.NODE_ENV === "development" && process.env.REACT_APP_DEV_FLAKE_URL) {
  flakeApiUrl = `${process.env.REACT_APP_DEV_FLAKE_URL}${FLAKE_API_PATH}`;
  flakeApiFullUrl = flakeApiUrl;
} else {
  flakeApiUrl = `${FLAKE_ENDPOINT}${FLAKE_API_PATH}`;
  flakeApiFullUrl = new URL(flakeApiUrl, baseUrl).href;
}

export const FLAKE_URL = flakeApiUrl;
export const FLAKE_API_FULL_URL = flakeApiFullUrl;
export const FLAKE_MODEL_PATH = "sample-models/flake_analysis/models/testflakes.model";

export function createFlakePredictionBody(log, model) {
  const modelPath = model || FLAKE_MODEL_PATH;
  return {"strData": `model=${modelPath}, data=${log}`};
}

function* createPredictionListItem(index, log) {
  yield put(createFlakePredictionListItemPending(index, log));
  try {
    const response = yield call(axios.post, FLAKE_URL, createFlakePredictionBody(log));
    yield put(createFlakePredictionListItemFulfilled(index, response));
  } catch (error) {
    yield put(createAxiosErrorNotification(error));
    yield put(createFlakePredictionListItemRejected(index, error));
  }
}

function* createPredictionList(action) {
  const logList = action.payload.logList;

  const predictionList = logList.map(log => ({
    log,
    flake: null,
    predictionPending: false,
    predictionResponse: null,
    predictionError: null
  }));

  yield put(createFlakePredictionListPending(predictionList));
  for (const [index, log] of logList.entries()) {
    yield* createPredictionListItem(index, log);
  }
  yield put(createFlakePredictionsFulfilled());
}

export function* watchCreateFlakePredictionList() {
  yield takeLatest(CREATE_FLAKE_PREDICTION_LIST, createPredictionList);
}

function* createCustomPrediction(action) {
  const log = action.payload.log;
  yield put(createCustomFlakePredictionPending(log));
  try {
    const response = yield call(axios.post, FLAKE_URL, createFlakePredictionBody(log));
    yield put(createCustomFlakePredictionFulfilled(response));
  } catch (error) {
    yield put(createAxiosErrorNotification(error));
    yield put(createCustomFlakePredictionRejected(error));
  }
}

export function* watchCreateCustomPrediction() {
  yield takeLatest(CREATE_CUSTOM_FLAKE_PREDICTION, createCustomPrediction);
}

export default [
  watchCreateFlakePredictionList(),
  watchCreateCustomPrediction()
];
