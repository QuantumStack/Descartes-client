import { handleActions, combineActions } from 'redux-actions';
import {
  INPUT_CHANGE, inputChange, INPUT_FOCUS, inputFocus, INPUT_BLUR, inputBlur, logInRequest, logInResponse,
} from '../actions';
import initialState from './initialState';
import { error } from '../util/alert';
import { authenticate } from '../util/auth';

const reducer = handleActions(
  {
    [combineActions(inputChange, inputFocus, inputBlur)]: (
      state,
      { type, payload: { space, name, value } },
    ) => {
      const obj = {
        [INPUT_CHANGE]: { [name]: value },
        [INPUT_FOCUS]: { indicator: name === 'password' ? '🙈' : '😯' },
        [INPUT_BLUR]: { indicator: '🐶' },
      }[type];
      return {
        ...state,
        [space]: {
          ...state[space],
          ...obj,
        },
      };
    },
    [logInRequest]: state => ({
      ...state,
      logIn: {
        ...state.logIn,
        isLoading: true,
        indicator: '✈️',
      },
    }),
    [logInResponse]: {
      next(state, { payload: { res, redirect } }) {
        authenticate(res.data.token);
        return {
          ...state,
          logIn: {
            ...state.logIn,
            indicator: '✅',
            isLoading: false,
          },
        };
      },
      throw(state, { payload: err }) {
        error(err.response ? err.response.statusText : '');
        return {
          ...state,
          logIn: {
            ...state.logIn,
            indicator: '🚨',
            isLoading: false,
          },
        };
      },
    },
  },
  initialState,
);

export default reducer;
