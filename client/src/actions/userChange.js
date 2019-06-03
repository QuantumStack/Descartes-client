import { createAction } from 'redux-actions';
import { ax, ACCOUNT_CHANGE_URL, authHeader } from '../util/api';
import deauthenticateIfNeeded from './deauthenticateIfNeeded';
import { userRequest } from './userFetch';

export const USER_CHANGE_RESPONSE = 'USER_CHANGE_RESPONSE';

export const userChangeResponse = createAction(USER_CHANGE_RESPONSE);

export const userChange = (name, password) => (dispatch) => {
  dispatch(userRequest());
  ax.post(ACCOUNT_CHANGE_URL, { data: { name, password }, headers: authHeader() })
    .then(() => dispatch(userChangeResponse()))
    .catch((err) => {
      if (!deauthenticateIfNeeded(err.response, dispatch)) dispatch(userChangeResponse(err));
    });
};
