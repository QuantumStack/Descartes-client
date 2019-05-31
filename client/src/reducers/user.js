import {
  USER_DEHYDRATE, USER_REQUEST, USER_RESPONSE, USER_INPUT_CHANGE, USER_CHANGE_RESPONSE,
} from '../actions';
import passwordChange from '../util/passwordChange';
import { error } from '../util/alert';

export default (state = {
  name: '',
  email: '',
  oldPassword: '',
  password: '',
  password2: '',
  mismatch: false,
  stength: 0,
  isLoading: false,
  isHydrated: false,
}, { type, payload, error: err }) => {
  switch (type) {
    case USER_INPUT_CHANGE: {
      let obj = {};
      if (payload.name.includes('password')) {
        obj = passwordChange(payload.name, payload.value, payload.password, payload.password2);
      }
      return {
        ...state,
        [payload.name]: payload.value,
        ...obj,
      };
    }
    case USER_CHANGE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        isHydrated: !err,
      };
    case USER_DEHYDRATE:
      return {
        ...state,
        isHydrated: false,
      };
    case USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_RESPONSE:
      if (err) {
        error(payload.response ? payload.response.statusText : '');
        return {
          ...state,
          isLoading: false,
        };
      }
      return {
        name: payload.name,
        email: payload.email,
        isLoading: false,
        isHydrated: true,
      };
    default:
      return state;
  }
};
