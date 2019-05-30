import zxcvbn from 'zxcvbn';
import {
  SIGN_UP_INPUT_CHANGE,
  SIGN_UP_CAPTCHA,
  SIGN_UP_REQUEST,
  SIGN_UP_RESPONSE,
  SIGN_UP_RESEND_REQUEST,
  SIGN_UP_RESEND_RESPONSE,
} from '../actions';
import { error } from '../util/alert';

export default (state = {
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
}, { type, payload, error: err }) => {
  switch (type) {
    case SIGN_UP_INPUT_CHANGE: {
      let obj = {};
      if (payload.name.includes('password')) {
        const currPassword = payload.name === 'password' ? payload.value : state.password;
        const currPassword2 = payload.name === 'password2' ? payload.value : state.password2;
        obj = {
          strength: zxcvbn(currPassword).score,
          mismatch: currPassword2 !== '' && currPassword !== currPassword2,
        };
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
