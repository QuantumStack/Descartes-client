import { CREATE_INPUT_CHANGE, CREATE_COURSE_REQUEST, CREATE_COURSE_RESPONSE } from '../actions';
import { error } from '../util/alert';

const defaultState = {
  name: '',
  description: '',
  plan: 'std',
  isLoading: false,
};

export default (state = defaultState, { type, payload, error: err }) => {
  switch (type) {
    case CREATE_INPUT_CHANGE:
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
      if (err || payload.error) {
        error(payload.error, payload.response);
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
