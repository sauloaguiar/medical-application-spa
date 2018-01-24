import { takeLatest, call, take, put, all } from 'redux-saga/effects';
import {
  LOGIN_START,
  LOGIN_VERIFICATION,
  loginSucceeded,
  loginFailed
} from '../actions/auth';
import auth0 from 'auth0-js';
import { eventChannel, END } from 'redux-saga';

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
  yield auth.authorize();
}

function parseHash() {
  return eventChannel(emitter => {
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log('auth success');
        emitter(authResult);
        emitter(END);
      } else {
        console.log('auth failed');
        emitter(err);
        emitter(END);
      }
    });
    return () => undefined;
  });
}

function* loginVerification(action) {
  const channel = yield call(parseHash);
  const data = yield take(channel);
  console.log('data: ', data);
  channel.close();
  if (data && !data.accessToken) {
    yield put(loginFailed(data));
  }
  yield put(loginSucceeded(data));
}

function* watchLoginRequest() {
  yield takeLatest(LOGIN_START, loginAuth0);
}

function* watchLoginVerification() {
  yield takeLatest(LOGIN_VERIFICATION, loginVerification);
}

function* authSaga() {
  yield all([watchLoginRequest(), watchLoginVerification()]);
}
export default authSaga;
