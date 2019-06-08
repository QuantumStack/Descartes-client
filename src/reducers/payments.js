import { PAYMENTS_DEHYDRATE, PAYMENTS_RECEIVE, LOG_OUT } from '../actions';

const defaultState = {
  isHydrated: false,
  items: [],
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case LOG_OUT:
      return defaultState;
    case PAYMENTS_DEHYDRATE:
      return {
        ...state,
        isHydrated: false,
      };
    case PAYMENTS_RECEIVE:
      return {
        ...state,
        isHydrated: true,
        items: payload,
      };
    default:
      return state;
  }
};
