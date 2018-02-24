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
import auth0 from 'auth0-js';
import { eventChannel, END } from 'redux-saga';
import { fork } from 'redux-saga/effects';

const requestedScopes = 'openid profile read:messages write:messages';

const auth = new auth0.WebAuth({
  domain: 'medicare.auth0.com',
  clientID: 'HmDhcgMMNHsCPthPf6feQUWjF5KFSd6x',
  redirectUri: 'http://localhost:3000/callback',
  audience: 'https://client-auth/',
  responseType: 'token id_token',
  scope: requestedScopes
});

function* loginAuth0(action) {
  yield call(auth.authorize.bind(auth));
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function parseHash() {
  return eventChannel(emitter => {
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log('auth success');
        emitter(authResult);
        emitter(END);
      } else {
        console.log('auth failed');
        emitter({});
        emitter(END);
      }
    });
    return () => console.log('parseHash ended');
  });
}

function* loginVerification(action) {
  const channel = yield call(parseHash);
  const data = yield take(channel);
  console.log('data: ', data);
  channel.close();
  if (data && !data.accessToken) {
    yield put(loginFailed(data));
  } else {
    yield put(loginSucceeded(data));
    yield fork(renewToken(data));
  }
}

function checkSession() {
  return eventChannel(emitter => {
    auth.checkSession({}, (err, result) => {
      if (err) {
        console.log('renew failed: ', err);
        emitter({});
        emitter(END);
      } else {
        console.log('renew ok: ');
        emitter(result);
        emitter(END);
      }
    });
    return () => console.log('checkSession ended');
  });
}
function* renewToken(data) {
  // https://github.com/Chiara-yen/redux-saga-timer-example/blob/master/app/sagas/index.js
  const expiresAt = JSON.parse(data.getItem('expires_at'));
  const waitTime = expiresAt - Date.now();
  yield call(delay, waitTime);

  const channel = yield call(checkSession);
  const channelData = yield take(channel);
  channel.close();
  if (channelData && !channelData.accessToken) {
    yield put(loginFailed(channelData));
  } else {
    yield put(loginSucceeded(channelData));
  }
}

function* logout() {
  // clear the timer when the user has logged out
}

function* watchLoginRequest() {
  yield takeLatest(LOGIN_START, loginAuth0);
}

function* watchLoginVerification() {
  yield takeEvery(LOGIN_VERIFICATION, loginVerification);
}

function* watchLogout() {
  yield takeEvery(LOGOUT, logout);
}

function* authSaga() {
  yield all([watchLoginRequest(), watchLoginVerification(), watchLogout()]);
}
export default authSaga;
