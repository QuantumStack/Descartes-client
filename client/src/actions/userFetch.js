import { createActions } from 'redux-actions';
import { ax, ACCOUNT_URL, authHeader } from '../util/api';
import deauthenticateIfNeeded from './deauthenticateIfNeeded';
import { paymentsReceive } from './paymentsReceive';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_RESPONSE = 'USER_RESPONSE';

export const { userRequest, userResponse } = createActions(USER_REQUEST, USER_RESPONSE);

const userFetch = () => (dispatch) => {
  dispatch(userRequest());
  ax.get(ACCOUNT_URL, { headers: authHeader() })
    .then(({ data }) => {
      dispatch(userResponse(data.user));
      dispatch(paymentsReceive(data.payments));
    })
    .catch((err) => {
      if (!deauthenticateIfNeeded(err.response, dispatch)) dispatch(userResponse(err));
    });
};

export const userFetchIfNeeded = () => (dispatch, getState) => {
  const { user, payments } = getState();
  if (!user.isHydrated || !payments.isHydrated) {
    return dispatch(userFetch());
  }
  return null;
};
