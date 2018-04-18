import {
  takeLatest,
  takeEvery,
  call,
  fork,
  put,
  all,
  select
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  LOGIN_START,
  LOGIN_VERIFICATION,
  LOGOUT,
  loginSucceeded,
  loginFailed
} from '../actions/auth';

import { login, validateSession, renewToken } from '../service/oAuthService';
import { getAuth } from '../selectors/index';

function* loginAuth0() {
  yield call(login);
}

export function* loginVerification(validateSession, storeTokenLocalStorage) {
  const data = yield call(validateSession);
  if (data && !data.accessToken) {
    yield put(loginFailed(data));
  } else {
    yield put(loginSucceeded(data));
    yield call(storeTokenLocalStorage, data);
    yield fork(scheduleTokenRenew);
  }
}

export function* scheduleTokenRenew() {
  while (true) {
    const waitTime = yield select(getAuth);
    yield call(delay, waitTime);
    yield fork(processTokenRenew);
  }
}

export function* processTokenRenew(storeTokenLocalStorage) {
  const data = yield call(renewToken);
  yield put(loginSucceeded(data));
  yield call(storeTokenLocalStorage, data);
}
function storeTokenLocalStorage(data) {
  let expiresAt = JSON.stringify(data.expiresIn * 1000 + new Date().getTime());
  const auth = {
    expiresAt,
    accessToken: data.accessToken,
    idToken: data.idToken,
    scopes: data.scope || ''
  };
  localStorage.setItem('auth', JSON.stringify(auth));
}
function logout() {
  localStorage.removeItem('auth');
}

function* watchLoginRequest() {
  yield takeLatest(LOGIN_START, loginAuth0);
}

function* watchLoginVerification() {
  yield takeEvery(
    LOGIN_VERIFICATION,
    loginVerification,
    validateSession,
    storeTokenLocalStorage
  );
}

function* watchLogout() {
  yield takeEvery(LOGOUT, logout);
}

export default function* authSaga() {
  yield all([watchLoginRequest(), watchLoginVerification(), watchLogout()]);
}
