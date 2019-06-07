import {
  CREATE_COURSE_INPUT_CHANGE,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_RESPONSE,
  CREATE_COURSE_PHASE_CHANGE,
} from '../actions';
import { error } from '../util/alert';

const defaultState = {
  phase: 0,
  name: '',
  description: '',
  plan: 'std',
  isLoading: false,
};

export default (state = defaultState, { type, payload, error: err }) => {
  switch (type) {
    case CREATE_COURSE_PHASE_CHANGE:
      return {
        ...state,
        phase: state.phase + payload,
      };
    case CREATE_COURSE_INPUT_CHANGE:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    case CREATE_COURSE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_COURSE_RESPONSE:
      if (err) {
        error(payload.response ? null : payload.toString(), payload.response);
        return {
          ...state,
          isLoading: false,
        };
      }
      return defaultState;
    default:
      return state;
  }
};
