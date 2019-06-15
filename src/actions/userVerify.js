import { createActions } from 'redux-actions';
import qs from 'querystring';
import { ax, VERIFY_URL } from '../util/api';

export const USER_VERIFY_REQUEST = 'USER_VERIFY_REQUEST';
export const USER_VERIFY_RESPONSE = 'USER_VERIFY_RESPONSE';

export const {
  userVerifyRequest, userVerifyResponse,
} = createActions(USER_VERIFY_REQUEST, USER_VERIFY_RESPONSE);

export const userVerify = () => (dispatch, getState) => {
  dispatch(userVerifyRequest());
  const { '?id': confirmationId, email } = qs.parse(getState().router.location.search);
  ax.post(VERIFY_URL, { email, confirmationId })
    .then(() => dispatch(userVerifyResponse()))
    .catch(err => dispatch(userVerifyResponse(err)));
};
