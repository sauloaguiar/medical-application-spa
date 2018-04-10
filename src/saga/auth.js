import {
  takeLatest,
  takeEvery,
  call,
  take,
  put,
  all
} from 'redux-saga/effects';
import {
  LOGIN_START,
  LOGIN_VERIFICATION,
  LOGOUT,
  loginSucceeded,
  loginFailed
} from '../actions/auth';

import { fork } from 'redux-saga/effects';
import { login, validateSession } from '../service/oAuthService';

function* loginAuth0() {
  yield call(login);
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export function* loginVerification(validateSession) {
  const data = yield call(validateSession);
  if (data && !data.accessToken) {
    yield put(loginFailed(data));
  } else {
    yield put(loginSucceeded(data));
  }
}

function* logout() {
  // clear the timer when the user has logged out
}

function* watchLoginRequest() {
  yield takeLatest(LOGIN_START, loginAuth0);
}

function* watchLoginVerification() {
  yield takeEvery(LOGIN_VERIFICATION, loginVerification, validateSession);
}

function* watchLogout() {
  yield takeEvery(LOGOUT, logout);
}

export default function* authSaga() {
  // yield all([watchLoginRequest(), watchLoginVerification(), watchLogout()]);
  yield all([watchLoginRequest(), watchLoginVerification()]);
}
