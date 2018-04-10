import auth0 from 'auth0-js';

const requestedScopes = 'openid profile read:messages write:messages';

export const auth = new auth0.WebAuth({
  domain: 'medicare.auth0.com',
  clientID: 'HmDhcgMMNHsCPthPf6feQUWjF5KFSd6x',
  redirectUri: 'http://localhost:3000/callback',
  audience: 'https://client-auth/',
  responseType: 'token id_token',
  scope: requestedScopes
});

export const login = () => {
  auth.authorize();
};

export const validateSession = () => {
  return new Promise((resolve, reject) => {
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        resolve(authResult);
      } else {
        if (!err) {
          reject(err);
        }
      }
    });
  });
};
