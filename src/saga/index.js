import patientSaga from './patients';
import { all, fork } from 'redux-saga/effects';

export default function* root() {
  yield all([fork(patientSaga)]);
}
