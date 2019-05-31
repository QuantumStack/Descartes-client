import { createActions } from 'redux-actions';
import { push } from 'connected-react-router';
import { ax, JOIN_URL, authHeader } from '../util/api';

export const JOIN_REQUEST = 'JOIN_REQUEST';
export const JOIN_RESPONSE = 'LOG_IN_RESPONSE';

export const { joinRequest, joinResponse } = createActions(JOIN_REQUEST, JOIN_RESPONSE);

export const logIn = code => (dispatch, getState) => {
  dispatch(joinRequest());
  ax.post(JOIN_URL, { data: { code }, headers: authHeader() })
    .then(({ data }) => {
      dispatch(joinResponse(data));
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
