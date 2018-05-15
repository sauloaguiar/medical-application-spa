import {
  takeLatest,
  takeEvery,
  call,
  fork,
  put,
  all,
  take,
  cancel
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  LOGIN_START,
  LOGIN_VERIFICATION,
  LOGOUT,
  loginSucceeded,
  loginFailed,
  LOGIN_SUCCEEDED
} from '../actions/auth';
import { START } from '../actions/startup';
import { login, validateSession, renewToken } from '../service/oAuthService';

function* loginAuth0() {
  yield call(login);
}

export function* loginVerification(validateSession, storeTokenLocalStorage) {
  const data = yield call(validateSession);
  if (data && !data.accessToken) {
    yield put(loginFailed(data));
  } else {
    data.expiresAt = data.expiresIn * 1000 + new Date().getTime();
    yield call(storeTokenLocalStorage, data);
    yield put(loginSucceeded(data));
  }
}

// gets triggered after app is loaded
function* checkAccessGranted() {
  // read from local storage
  const data = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : {};
  if (data && data.accessToken && data.expiresAt > new Date().getTime()) {
    // if there's something, update redux
    yield put(loginSucceeded(data));
  }
}

export function* scheduleTokenRenew(data) {
  while (true) {
    const { expiresAt } = data.payload;
    const waitTime = 10000; //expiresAt - Date.now();
    // console.log(delay);
    // console.log('wait: ', waitTime);
    // https://start.jcolemorrison.com/react-and-redux-sagas-authentication-app-tutorial-part-2/
    let task;
    if (waitTime > 0) {
      yield call(delay, waitTime);
      task = yield fork(processTokenRenew, storeTokenLocalStorage);
    }
    yield take(LOGOUT);
    if (task) yield cancel(task);
    yield call(logoutUser, window.localStorage, 'auth');
  }
}

export function* processTokenRenew(storeTokenLocalStorage) {
  const data = yield call(renewToken);
  if (data && !data.accessToken) {
    yield put(loginFailed(data));
  } else {
    data.expiresAt = data.expiresIn * 1000 + new Date().getTime();
    yield put(loginSucceeded(data));
    yield call(storeTokenLocalStorage, data);
  }
}

export function storeTokenLocalStorage(data) {
  const auth = {
    expiresAt: data.expiresAt,
    accessToken: data.accessToken,
    idToken: data.idToken,
    scopes: data.scope || ''
  };
  localStorage.setItem('auth', JSON.stringify(auth));
}

export function* logoutUser(localStorage, key) {
  // https://redux-saga.js.org/docs/api/#callcontext-fnname-args
  yield call([localStorage, 'removeItem'], key);
}

function* watchLoginRequest() {
  yield takeLatest(LOGIN_START, loginAuth0);
}

function* watchCredentialsGranted() {
  yield takeLatest(LOGIN_SUCCEEDED, scheduleTokenRenew);
}

function* watchLoginVerification() {
  yield takeEvery(
    LOGIN_VERIFICATION,
    loginVerification,
    validateSession,
    storeTokenLocalStorage
  );
}

export function* watchStartup() {
  yield takeLatest(START, checkAccessGranted);
}

export default function* authSaga() {
  yield all([
    watchLoginRequest(),
    watchLoginVerification(),
    watchCredentialsGranted(),
    watchStartup()
  ]);
}
