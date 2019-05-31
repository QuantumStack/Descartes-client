import { createAction } from 'redux-actions';
import { userRequest } from './userFetch';
import { ax, ACCOUNT_CHANGE_URL, authHeader } from '../util/api';

export const USER_CHANGE_RESPONSE = 'USER_CHANGE_RESPONSE';

export const userChangeResponse = createAction(USER_CHANGE_RESPONSE);

// TODO: deauth user if 401
export const userChange = (name, password) => (dispatch) => {
  dispatch(userRequest());
  ax.post(ACCOUNT_CHANGE_URL, { data: { name, password }, headers: authHeader() })
    .then(() => dispatch(userChangeResponse()))
    .catch(err => dispatch(userChangeResponse(err)));
};
