import { createAction } from 'redux-actions';
import inputChange from './inputChange';

export const LOG_IN_INPUT_CHANGE = 'LOG_IN_INPUT_CHANGE';

export const logInInputChange = createAction(
  LOG_IN_INPUT_CHANGE,
  inputChange,
);
