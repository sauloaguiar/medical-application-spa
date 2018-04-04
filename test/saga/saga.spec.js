import { loginVerification } from '../../src/saga/auth';
import { call } from  'redux-saga/effects';
import { assert } from 'chai';

describe('auth saga tests', () => {
  it('successfully logs in', (done) => {
    const gen = loginVerification();

    assert.deepEqual(
      gen.next().value,
      { channel: 1 },
      'asserts channel'
    );
  });  
})
