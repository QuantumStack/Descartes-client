import { createActions } from 'redux-actions';
import { ax, SIGN_UP_URL } from '../util/api';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_RESPONSE = 'SIGN_UP_RESPONSE';

export const { signUpRequest, signUpResponse } = createActions(SIGN_UP_REQUEST, SIGN_UP_RESPONSE);

export const signUp = (name, email, password, recaptcha) => (dispatch) => {
  dispatch(signUpRequest());
  ax.post(SIGN_UP_URL, {
    fullName: name, email, password, 'g-recaptcha-response': recaptcha,
  })
    .then(res => dispatch(signUpResponse(res)))
    .catch(err => dispatch(signUpResponse(err)));
};
