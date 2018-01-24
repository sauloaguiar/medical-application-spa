export const LOGIN_START = 'LOGIN_START';
export const LOGIN_VERIFICATION = 'LOGIN_VERIFICATION';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const loginAction = () => {
  return {
    type: LOGIN_START
  };
};

export const verifyLogin = props => {
  return {
    type: LOGIN_VERIFICATION,
    payload: props
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
