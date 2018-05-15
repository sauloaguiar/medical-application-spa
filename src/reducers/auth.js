import { LOGIN_SUCCEEDED, LOGOUT } from '../actions/auth';

const initialState = {
  accessToken: null,
  idToken: null,
  expiresAt: null,
  scopes: null
};

// redux persits?
// redux middleware
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        accessToken: payload.accessToken,
        idToken: payload.idToken,
        expiresAt: payload.expiresAt,
        scopes: payload.scope
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
