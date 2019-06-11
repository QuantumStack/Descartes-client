import {
  CREATE_COURSE_INPUT_CHANGE,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_RESPONSE,
  CREATE_COURSE_PHASE_CHANGE,
} from '../actions';
import { error } from '../util/alert';
import { COUPON_CHECK_REQUEST, COUPON_CHECK_RESPONSE } from '../actions/checkCoupon';

const defaultState = {
  phase: 0,
  name: '',
  description: '',
  plan: 'std',
  coupon: '',
  couponLoading: false,
  couponHydrated: false,
  couponVerified: false,
  couponPrice: 0,
  isLoading: false,
};

export default (state = defaultState, { type, payload, error: err }) => {
  switch (type) {
    case CREATE_COURSE_PHASE_CHANGE:
      return {
        ...state,
        phase: state.phase + payload,
      };
    case CREATE_COURSE_INPUT_CHANGE:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    case COUPON_CHECK_REQUEST:
      return {
        ...state,
        couponLoading: true,
      };
    case COUPON_CHECK_RESPONSE:
      if (err) {
        error(payload.response ? null : payload.toString(), payload.response);
        return {
          ...state,
          couponLoading: false,
        };
      }
      return {
        ...state,
        couponLoading: false,
        couponHydrated: true,
        couponVerified: payload.data.verified,
        couponPrice: payload.data.price,
      };
    case CREATE_COURSE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_COURSE_RESPONSE:
      if (err) {
        error(payload.response ? null : payload.toString(), payload.response);
        return {
          ...state,
          isLoading: false,
        };
      }
      return defaultState;
    default:
      return state;
  }
};
