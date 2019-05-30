import { createAction } from 'redux-actions';

export const LOG_IN_INPUT_FOCUS = 'INPUT_FOCUS';

export const logInInputFocus = createAction(
  LOG_IN_INPUT_FOCUS,
  event => event.target.name,
);
