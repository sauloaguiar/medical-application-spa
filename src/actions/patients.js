export const PATIENTS_BY_CAREGIVER_ID_REQUESTED =
  'PATIENTS_BY_CAREGIVER_ID_REQUESTED';
export const PATIENTS_BY_CAREGIVER_ID_SUCCEEDED =
  'PATIENTS_BY_CAREGIVER_ID_SUCCEEDED';
export const PATIENTS_BY_CAREGIVER_ID_FAILED =
  'PATIENTS_BY_CAREGIVER_ID_FAILED';

export const PATIENT_SCHEDULE_REQUESTED = 'PATIENT_SCHEDULE_REQUESTED';
export const PATIENT_SCHEDULE_SUCCEEDED = 'PATIENT_SCHEDULE_SUCCEEDED';
export const PATIENT_SCHEDULE_FAILED = 'PATIENT_SCHEDULE_FAILED';

export const loadPatientsByLoggedCaregiver = () => {
  return {
    type: PATIENTS_BY_CAREGIVER_ID_REQUESTED
  };
};

export const loadPatientsByCaregiverId = id => {
  return {
    type: PATIENTS_BY_CAREGIVER_ID_REQUESTED,
    payload: id
  };
};

export const patientsLoadedSucceeded = patients => {
  return {
    type: PATIENTS_BY_CAREGIVER_ID_SUCCEEDED,
    payload: patients
  };
};

export const patientsLoadedFailed = error => {
  return {
    type: PATIENTS_BY_CAREGIVER_ID_FAILED,
    payload: error
  };
};

export const loadPatientSchedule = id => {
  return {
    type: PATIENT_SCHEDULE_REQUESTED,
    payload: id
  };
};
