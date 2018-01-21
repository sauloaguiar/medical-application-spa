import { takeLatest, call, put } from 'redux-saga/effects';
import { LOGIN_START, LOGIN_SUCCEEDED, LOGIN_FAILED } from '../actions/auth';

function* loginAuth0(action) {
  yield console.log('login ', action);
}

export default function* watchLoginRequest() {
  console.log('watchLoginRequest ');
  yield takeLatest(LOGIN_START, loginAuth0);
}
