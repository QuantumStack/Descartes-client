import {
  USER_REQUEST, USER_RESPONSE, USER_INPUT_CHANGE, USER_CHANGE_RESPONSE, LOG_OUT,
} from '../actions';
import passwordChange from '../util/passwordChange';
import { error } from '../util/alert';

const defaultState = {
  firstName: '',
  lastName: '',
  email: '',
  oldPassword: '',
  password: '',
  password2: '',
  mismatch: false,
  strength: 0,
  isLoading: false,
  isHydrated: false,
};

export default (state = defaultState, { type, payload, error: err }) => {
  switch (type) {
    case LOG_OUT:
      return defaultState;
    case USER_INPUT_CHANGE: {
      let obj = {};
      if (payload.name.includes('password')) {
        obj = passwordChange(payload.name, payload.value, state.password, state.password2);
      }
      return {
        ...state,
        [payload.name]: payload.value,
        ...obj,
      };
    }
    case USER_CHANGE_RESPONSE:
      if (err) error(payload.response ? payload.response.statusText : '');
      return {
        ...state,
        isLoading: false,
        isHydrated: !err,
      };
    case USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_RESPONSE:
      if (err) {
        error(null, payload.response);
        return {
          ...state,
          isLoading: false,
        };
      }
      return {
        ...state,
        ...payload,
        isLoading: false,
        isHydrated: true,
      };
    default:
      return state;
  }
};
