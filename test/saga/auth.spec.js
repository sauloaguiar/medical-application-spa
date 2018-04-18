import { loginVerification, scheduleTokenRenew, processTokenRenew } from '../../src/saga/auth';
import { call, put, select, fork } from  'redux-saga/effects';
import { delay } from 'redux-saga';
import { assert } from 'chai';
import { LOGIN_SUCCEEDED, LOGIN_FAILED } from '../../src/actions/auth';
import { cloneableGenerator } from 'redux-saga/utils';
import { getAuth } from '../../src/selectors/auth';
import { renewToken } from '../../src/service/oAuthService';

describe('auth saga', () => {
  describe('loginVerification()', () => {
    const testValidateSession = () => {};
    const testStoreToken = (data) => {};
    const validAuth = { accessToken: true, idToken: true };
    const invalidAuth = {};
    const generator = cloneableGenerator(loginVerification)(testValidateSession, testStoreToken);

    it('should return call validateSession', () => {
      assert.deepEqual(
        generator.next().value,
        call(testValidateSession)
      );
    });
    
    it('should succeed for valid user', () => {
      const clone = generator.clone();
      assert.deepEqual(
        clone.next(validAuth).value,
        put({
          type: LOGIN_SUCCEEDED,
          payload: validAuth
        })
      );

      assert.deepEqual(
        clone.next(validAuth).value,
        call(testStoreToken, validAuth),
        "called storeTokenLocalStorage correctly"
      );
    });

    it('should fail for invalid user', () => {
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

  describe('scheduleTokenRenew', () => {
    const generator = scheduleTokenRenew();
    it('should execute as expected ',  () => {
      // calls select
      assert.deepEqual(generator.next().value, select(getAuth));
      
      // calls delay
      assert.deepEqual(generator.next(1000).value, call(delay, 1000));

      // calls fork
      assert.deepEqual(generator.next().value, fork(processTokenRenew));

    });
  });

  describe('procesTokenRenew', () => {
    it('should call renewToken and put login succeed', () => {
      const validAuth = { accessToken: true, idToken: true };
      const testStoreToken = (data) => {};
      const generator = processTokenRenew(testStoreToken);
      
      // call renew token
      assert.deepEqual(
        generator.next().value,
        call(renewToken)
      );

      // put new login data
      assert.deepEqual(
        generator.next(validAuth).value, 
        put({
          type: LOGIN_SUCCEEDED,
          payload: validAuth
        })
      );

      // call localStorage to update data
      assert.deepEqual(
        generator.next().value,
        call(testStoreToken, validAuth)
      );
    });
  });
  
})
