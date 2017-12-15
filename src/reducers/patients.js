import {
  PATIENTS_BY_CAREGIVER_ID_REQUESTED,
  PATIENTS_BY_CAREGIVER_ID_SUCCEEDED,
  PATIENTS_BY_CAREGIVER_ID_FAILED,
  PATIENT_SCHEDULE_REQUESTED
} from '../actions/patients';

const initialState = {
  patients: [],
  isLoading: false,
  error: null,
  loaded: false,
  loadingSchedule: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PATIENTS_BY_CAREGIVER_ID_REQUESTED:
      return {
        ...state,
        isLoading: true
      };
    case PATIENTS_BY_CAREGIVER_ID_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        patients: JSON.parse(payload),
        loaded: true
      };
    case PATIENTS_BY_CAREGIVER_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
        loaded: true
      };
    default:
      return state;
  }
};
