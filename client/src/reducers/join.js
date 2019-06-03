import { JOIN_INPUT_CHANGE, JOIN_REQUEST, JOIN_RESPONSE } from '../actions';
import { error } from '../util/alert';

const defaultState = {
  code: '',
  isLoading: false,
};

export default (state = defaultState, { type, payload, error: err }) => {
  switch (type) {
    case JOIN_INPUT_CHANGE:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    case JOIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case JOIN_RESPONSE:
      if (err) {
        error(null, payload.response);
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
