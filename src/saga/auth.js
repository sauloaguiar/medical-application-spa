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

function* loginAuth0(action) {
  yield call(login);
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function* loginVerification(action) {
  const data = yield call(validateSession);
  if (data && !data.accessToken) {
    yield put(loginFailed(data));
  } else {
    yield put(loginSucceeded(data));
    // yield fork(renewToken(data));
  }
}

// function checkSession() {
//   return eventChannel(emitter => {
//     auth.checkSession({}, (err, result) => {
//       if (err) {
//         console.log('renew failed: ', err);
//         emitter({});
//         emitter(END);
//       } else {
//         console.log('renew ok: ');
//         emitter(result);
//         emitter(END);
//       }
//     });
//     return () => console.log('checkSession ended');
//   });
// }
// function* renewToken(data) {
//   // https://github.com/Chiara-yen/redux-saga-timer-example/blob/master/app/sagas/index.js
//   const expiresAt = JSON.parse(data.getItem('expires_at'));
//   const waitTime = expiresAt - Date.now();
//   yield call(delay, waitTime);

//   const channel = yield call(checkSession);
//   const channelData = yield take(channel);
//   channel.close();
//   if (channelData && !channelData.accessToken) {
//     yield put(loginFailed(channelData));
//   } else {
//     yield put(loginSucceeded(channelData));
//   }
// }

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

export default function* authSaga() {
  // yield all([watchLoginRequest(), watchLoginVerification(), watchLogout()]);
  yield all([watchLoginRequest(), watchLoginVerification()]);
}
