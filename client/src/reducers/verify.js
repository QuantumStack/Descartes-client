import { USER_VERIFY_REQUEST, USER_VERIFY_RESPONSE } from '../actions';
import { error } from '../util/alert';

const defaultState = {
  isLoading: false,
  isSuccess: false,
};

export default (state = defaultState, { type, payload, error: err }) => {
  switch (type) {
    case USER_VERIFY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_VERIFY_RESPONSE:
      if (err) {
        error(null, payload.response);
        return {
          ...state,
          isLoading: false,
        };
      }
      return {
        ...defaultState,
        isSuccess: true,
      };
    default:
      return state;
  }
};
