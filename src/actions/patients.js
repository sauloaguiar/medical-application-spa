export const PATIENTS_BY_ID_REQUESTED = 'PATIENTS_BY_ID_REQUESTED';
export const PATIENTS_BY_ID_SUCCEEDED = 'PATIENTS_BY_ID_SUCCEEDED';
export const PATIENTS_BY_ID_FAILED = 'PATIENTS_BY_ID_FAILED';

export const loadUserById = id => {
  return {
    type: PATIENTS_BY_ID_REQUESTED,
    payload: id
  };
};

export const patientsLoadedSucceeded = patients => {
  return {
    type: PATIENTS_BY_ID_SUCCEEDED,
    payload: patients
  };
};

export const patientsLoadedFailed = error => {
  return {
    type: PATIENTS_BY_ID_FAILED,
    payload: error
  };
};
