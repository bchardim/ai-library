import { all } from 'redux-saga/effects'
import regressionSagas from "../Regression/sagas";
import flakeSagas from "../Flake/sagas";

export default function* rootSaga() {
  yield all([
    ...regressionSagas,
    ...flakeSagas
  ]);
}
