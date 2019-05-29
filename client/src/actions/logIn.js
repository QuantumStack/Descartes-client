import { createAction } from 'redux-actions';
import logInRequest from './logInRequest';
import logInResponse from './logInResponse';
import { ax, LOG_IN_URL } from '../util/api';

export const LOG_IN = 'LOG_IN';

export default createAction(
  LOG_IN,
  (email, password, redirect) => (dispatch) => {
    dispatch(logInRequest);
    ax.post(LOG_IN_URL, { email, password })
      .then(res => dispatch(logInResponse({ res, redirect })))
      .catch(err => dispatch(logInResponse(err)));
  },
);
y
