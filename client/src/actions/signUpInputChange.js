import { createAction } from 'redux-actions';
import inputChange from './inputChange';

export const SIGN_UP_INPUT_CHANGE = 'SIGN_UP_INPUT_CHANGE';

export const signUpInputChange = createAction(
  SIGN_UP_INPUT_CHANGE,
  inputChange,
);
