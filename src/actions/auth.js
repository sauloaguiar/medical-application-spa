export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const loginAction = () => {
  console.log('login');
  return {
    type: LOGIN_START
  };
};
