import { createActions } from 'redux-actions';
import { ax, CHECK_COUPON_URL, authHeader } from '../util/api';
import deauthenticateIfNeeded from './deauthenticateIfNeeded';

export const COUPON_CHECK_REQUEST = 'COUPON_CHECK_REQUEST';
export const COUPON_CHECK_RESPONSE = 'COUPON_CHECK_RESPONSE';

export const {
  couponCheckRequest, couponCheckResponse,
} = createActions(COUPON_CHECK_REQUEST, COUPON_CHECK_RESPONSE);

export const checkCoupon = code => (dispatch) => {
  dispatch(couponCheckRequest());
  ax.get(CHECK_COUPON_URL, { params: { code }, headers: authHeader() })
    .then(res => dispatch(couponCheckResponse(res)))
    .catch((err) => {
      if (!deauthenticateIfNeeded(err.response, dispatch)) dispatch(couponCheckResponse(err));
    });
};
