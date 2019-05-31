import { PAYMENTS_DEHYDRATE, PAYMENTS_RECEIVE } from '../actions';

export default (state = {
  isHydrated: false,
  items: [],
}, { type, payload }) => {
  switch (type) {
    case PAYMENTS_DEHYDRATE:
      return {
        ...state,
        isHydrated: false,
      };
    case PAYMENTS_RECEIVE:
      return {
        ...state,
        items: payload,
      };
    default:
      return state;
  }
};
