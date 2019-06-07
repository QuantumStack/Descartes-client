import { createActions } from 'redux-actions';
import { ax, RESEND_URL } from '../util/api';

export const SIGN_UP_RESEND_REQUEST = 'SIGN_UP_RESEND_REQUEST';
export const SIGN_UP_RESEND_RESPONSE = 'SIGN_UP_RESEND_RESPONSE';

export const {
  signUpResendRequest, signUpResendResponse,
} = createActions(SIGN_UP_RESEND_REQUEST, SIGN_UP_RESEND_RESPONSE);

export const signUpResend = email => (dispatch) => {
  dispatch(signUpResendRequest());
  ax.post(RESEND_URL, { email })
    .then(res => dispatch(signUpResendResponse(res)))
    .catch(err => dispatch(signUpResendResponse(err)));
};
