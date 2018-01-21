import { LOGIN_START, LOGIN_SUCCEEDED, LOGIN_FAILED } from '../actions/auth';

const initialState = {
  accessToken: null,
  idToken: null,
  expiresAt: null,
  scopes: null
};

export default (state = initialState, action) => {
  return state;
};
