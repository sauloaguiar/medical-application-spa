export const LOGIN_START = 'LOGIN_START';
export const LOGIN_VERIFICATION = 'LOGIN_VERIFICATION';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';

export const login = () => {
  return {
    type: LOGIN_START
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const verifyLogin = () => {
  return {
    type: LOGIN_VERIFICATION
  };
};

export const loginSucceeded = authResult => ({
  type: LOGIN_SUCCEEDED,
  payload: authResult
});

export const loginFailed = err => ({
  type: LOGIN_FAILED,
  payload: err
});
