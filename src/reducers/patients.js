import {
  PATIENTS_BY_ID_REQUESTED,
  PATIENTS_BY_ID_SUCCEEDED,
  PATIENTS_BY_ID_FAILED
} from '../actions/patients';

const initialState = {
  patients: [],
  isLoading: false,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PATIENTS_BY_ID_REQUESTED:
      return {
        ...state,
        isLoading: true
      };
    case PATIENTS_BY_ID_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        patients: JSON.parse(payload)
      };
    case PATIENTS_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
};
