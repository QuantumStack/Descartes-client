import { createActions } from 'redux-actions';
import { push } from 'connected-react-router';
import { ax, LOG_IN_URL } from '../util/api';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_RESPONSE = 'LOG_IN_RESPONSE';

export const { logInRequest, logInResponse } = createActions(LOG_IN_REQUEST, LOG_IN_RESPONSE);

export const logIn = (email, password, redirect) => (dispatch) => {
  dispatch(logInRequest());
  ax.post(LOG_IN_URL, { email, password, redirect })
    .then((res) => {
      dispatch(logInResponse(res));
      switch (redirect) {
        case '?type=instructor':
          return dispatch(push('/create'));
        case '?type=student':
          return dispatch(push('/enroll'));
        default:
          return dispatch(push('/dashboard'));
      }
    })
    .catch(err => dispatch(logInResponse(err)));
};
