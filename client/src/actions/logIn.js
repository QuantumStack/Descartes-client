import { createActions } from 'redux-actions';
import { push } from 'connected-react-router';
import { ax, LOG_IN_URL } from '../util/api';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_RESPONSE = 'LOG_IN_RESPONSE';

export const { logInRequest, logInResponse } = createActions(LOG_IN_REQUEST, LOG_IN_RESPONSE);

export const logIn = (email, password) => (dispatch, getState) => {
  dispatch(logInRequest());
  ax.post(LOG_IN_URL, { email, password })
    .then(({ data }) => {
      dispatch(logInResponse(data));
      const redirect = getState().router.location.search;
      switch (redirect) {
        case '?type=instructor':
          dispatch(push('/create'));
          break;
        case '?type=student':
          dispatch(push('/enroll'));
          break;
        default:
          dispatch(push('/dashboard'));
      }
    })
    .catch(err => dispatch(logInResponse(err)));
};
