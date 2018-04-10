import { loginVerification } from '../../src/saga/auth';
import { call, put } from  'redux-saga/effects';
import { assert } from 'chai';
import { LOGIN_SUCCEEDED, LOGIN_FAILED } from '../../src/actions/auth';
import { cloneableGenerator } from 'redux-saga/utils';

describe('auth saga', () => {
  describe('loginVerification()', () => {
    const testValidateSession = () => {};
    const validAuth = { accessToken: true, idToken: true };
    const invalidAuth = {};
    const generator = cloneableGenerator(loginVerification)(testValidateSession);
    it('should return call validateSession', () => {
      assert.deepEqual(
        generator.next().value,
        call(testValidateSession)
      );
    });
    
    it('should call put loginSucceeded', () => {
      const clone = generator.clone();
      assert.deepEqual(
        clone.next(validAuth).value,
        put({
          type: LOGIN_SUCCEEDED,
          payload: validAuth
        })
      );
    });

    it('should call put loginFail', () => {
      const clone = generator.clone();
      assert.deepEqual(
        clone.next(invalidAuth).value,
        put({
          type: LOGIN_FAILED,
          payload: invalidAuth
        })
      );
    });
  });
  
})
