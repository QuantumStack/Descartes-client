import {
  SIGN_UP_INPUT_CHANGE,
  SIGN_UP_CAPTCHA,
  SIGN_UP_REQUEST,
  SIGN_UP_RESPONSE,
  SIGN_UP_RESEND_REQUEST,
  SIGN_UP_RESEND_RESPONSE,
  LOG_OUT,
} from '../actions';
import { error } from '../util/alert';
import passwordChange from '../util/passwordChange';

const defaultState = {
  name: '',
  email: '',
  password: '',
  strength: 0,
  password2: '',
  mismatch: false,
  agreement: false,
  recaptcha: '',
  isLoading: false,
  isSuccess: false,
};

export default (state = defaultState, { type, payload, error: err }) => {
  switch (type) {
    case LOG_OUT:
      return defaultState;
    case SIGN_UP_INPUT_CHANGE: {
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
    case SIGN_UP_CAPTCHA:
      return {
        ...state,
        recaptcha: payload,
      };
    case SIGN_UP_REQUEST:
    case SIGN_UP_RESEND_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_UP_RESPONSE:
    case SIGN_UP_RESEND_RESPONSE:
      if (err) {
        error(payload.response ? payload.response.statusText : '');
        return {
          ...state,
          isLoading: false,
        };
      }
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    default:
      return state;
  }
};
