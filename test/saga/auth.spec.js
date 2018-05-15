import {
  loginVerification,
  scheduleTokenRenew,
  processTokenRenew,
  logoutUser,
  storeTokenLocalStorage,
  watchStartup,
  checkAccessGranted
} from '../../src/saga/auth';
import { call, put, fork } from  'redux-saga/effects';
import { delay } from 'redux-saga';
import { assert } from 'chai';
import { LOGIN_SUCCEEDED, LOGIN_FAILED } from '../../src/actions/auth';
import { cloneableGenerator, fromGenerator } from 'redux-saga/utils';
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
        call(testStoreToken, validAuth),
        "called storeTokenLocalStorage correctly"
      );
      
      assert.deepEqual(
        clone.next(validAuth).value,
        put({
          type: LOGIN_SUCCEEDED,
          payload: validAuth
        })
      );

      // should be finished
      assert.equal(clone.next().done, true);

      // how do I test that the scheduleTokenRenew generator was started after the success was fired?
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
    const data = {
      payload: {
        expiresAt: 1000,
        accessToken: 'token-goes-here',    
        idToken: 'token-id',
        scopes: 'scopes'
      }
    };

    const generator = scheduleTokenRenew(data, processTokenRenew, storeTokenLocalStorage);
    it('should execute as expected ',  () => {
      // calls delay
      assert.deepEqual(generator.next().value, call(delay, 10000));
      
      // calls fork
      assert.deepEqual(generator.next().value, fork(processTokenRenew, storeTokenLocalStorage));

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

  describe('logout', () => {
    it('should clear localStorage', () => {
      
      const storageBuilder = () => {
        return {
          removeItem: function() {}
        }
      }

      const storage = storageBuilder();
      const generator = logoutUser(storage, 'auth');
    
      assert.deepEqual(
        generator.next().value,
        call([storage, 'removeItem'], 'auth')
      );

      // call localStorage to clear data
      assert.equal(generator.next().done, true);
    });
  });
  
})
