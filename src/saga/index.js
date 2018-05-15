import patientSaga from './patients';
import authSaga from './auth';
import { all, fork } from 'redux-saga/effects';

export default function* root() {
  yield all([fork(patientSaga), fork(authSaga)]);
}
