import {
  LOG_IN_INPUT_CHANGE, LOG_IN_INPUT_FOCUS, LOG_IN_INPUT_BLUR, LOG_IN_REQUEST, LOG_IN_RESPONSE, LOG_OUT,
} from '../actions';
import { error } from '../util/alert';
import { authenticate } from '../util/auth';

const defaultState = {
  email: '',
  password: '',
  isLoading: false,
  indicator: '🐩',
};

export default (state = defaultState, { type, payload, error: err }) => {
  switch (type) {
    case LOG_OUT:
      return defaultState;
    case LOG_IN_INPUT_CHANGE:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    case LOG_IN_INPUT_FOCUS:
      return {
        ...state,
        indicator: payload === 'password' ? '🙈' : '😯',
      };
    case LOG_IN_INPUT_BLUR:
      return {
        ...state,
        indicator: '🐶',
      };
    case LOG_IN_REQUEST:
      return {
        ...state,
        indicator: '✈️',
        isLoading: true,
      };
    case LOG_IN_RESPONSE:
      if (err) {
        error(payload.response ? payload.response.statusText : '');
        return {
          ...state,
          indicator: '🚨',
          isLoading: false,
        };
      }
      authenticate(payload.token);
      return {
        ...state,
        indicator: '🐩',
        isLoading: false,
      };
    default:
      return state;
  }
};
