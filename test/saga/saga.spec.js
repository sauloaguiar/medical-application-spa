import { loginVerification } from '../../src/saga/auth';
import { call, put } from  'redux-saga/effects';
import { validateSession } from '../../src/service/oAuthService';
import { assert } from 'chai';
import { LOGIN_SUCCEEDED, LOGIN_FAILED } from '../../src/actions/auth';
import { cloneableGenerator } from 'redux-saga/utils';

describe('auth saga', () => {
  describe('loginVerification()', () => {
    const auth = {
      parseHash: () => { }
    };
    const generator = cloneableGenerator(loginVerification)(auth);
    it('should return call validateSession', () => {
      const v = generator.next().value;
      console.log(v);
      assert.deepEqual(
        v,
        call(validateSession, auth)
      );
    });
    
    it('should call put loginSucceeded', () => {
      const clone = generator.clone();
      assert.deepEqual(
        clone.next().value,
        put({
          type: LOGIN_SUCCEEDED,
          payload: undefined
        })
      );
    });

    it('should call put loginFail', () => {
      const clone = generator.clone();
      assert.deepEqual(
        clone.next().value,
        put({
          type: LOGIN_FAILED,
          payload: undefined
        })
      );
    });
  });
  
})
