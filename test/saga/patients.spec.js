import { fetchPatients } from '../../src/saga/patients';
import { call, put } from  'redux-saga/effects';
import { assert } from 'chai';
import { patientsLoadedSucceeded } from '../../src/actions/patients';

describe('patient saga tests', () => {
  it('produces the first yield correctly', () => {
    const action = {
      payload: {
        id: 1
      }
    }
    const fun = () => ( action.payload );
    const gen = fetchPatients(fun, action);
    const patients = {patients: [{name: 'name', id: 1}]};

    assert.deepEqual(gen.next().value, call(fun, action.payload), "result should be equal");
    assert.deepEqual(gen.next(patients).value, put(patientsLoadedSucceeded(patients)), 'patients should be equal');
  });
});