import { createActions } from 'redux-actions';
import { ax, VERIFY_URL } from '../util/api';

export const USER_VERIFY_REQUEST = 'USER_VERIFY_REQUEST';
export const USER_VERIFY_RESPONSE = 'USER_VERIFY_RESPONSE';

export const {
  userVerifyRequest, userVerifyResponse,
} = createActions(USER_VERIFY_REQUEST, USER_VERIFY_RESPONSE);

export const userVerify = () => (dispatch, getState) => {
  dispatch(userVerifyRequest());
  const id = getState().router.location.search.slice(4);
  ax.post(VERIFY_URL, { id })
    .then(() => dispatch(userVerifyResponse()))
    .catch(err => dispatch(userVerifyResponse(err)));
};
