import { createAction } from 'redux-actions';
import { push } from 'connected-react-router';
import { deauthenticate } from '../util/auth';

export const LOG_OUT = 'LOG_OUT';

export const logOut = createAction(LOG_OUT);

export const doLogOut = unintentional => (dispatch) => {
  deauthenticate();
  dispatch(push(unintentional === true ? '/login' : '/'));
  dispatch(logOut());
};
