import { takeLatest, call, put } from 'redux-saga/effects';
import {
  PATIENTS_BY_CAREGIVER_ID_REQUESTED,
  patientsLoadedSucceeded,
  patientsLoadedFailed
} from '../actions/patients';
import request from 'request-promise-native';

const RESOURCE_URL = 'http://localhost:3000/data.json';

function makeHttp(id) {
  // remember to use the id later, it might be helpful
  return request(RESOURCE_URL);
}

function* fetchPatients(action) {
  try {
    const patients = yield call(makeHttp, action.payload);
    yield put(patientsLoadedSucceeded(patients));
  } catch (error) {
    yield put(patientsLoadedFailed(error));
  }
}

export default function* watchPatientRequest() {
  yield takeLatest(PATIENTS_BY_CAREGIVER_ID_REQUESTED, fetchPatients);
}
