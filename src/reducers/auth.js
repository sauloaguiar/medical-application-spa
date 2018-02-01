import { LOGIN_START, LOGIN_SUCCEEDED, LOGIN_FAILED } from '../actions/auth';

const initialState = {
  accessToken: null,
  idToken: null,
  expiresAt: null,
  scopes: null
};

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        accessToken: payload.accessToken,
        idToken: payload.idToken,
        expiresAt: payload.expiresIn * 1000 + new Date().getTime(),
        scopes: payload.scope || initialState.scopes
      };
    default:
      return state;
  }
};
