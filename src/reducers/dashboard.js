import { DASHBOARD_REQUEST, DASHBOARD_RESPONSE } from '../actions';
import { error } from '../util/alert';

const defaultState = {
  isLoading: false,
};

export default (state = defaultState, { type, payload, error: err }) => {
  switch (type) {
    case DASHBOARD_REQUEST:
      return { isLoading: true };
    case DASHBOARD_RESPONSE:
      if (err) error(null, payload.response);
      return defaultState;
    default:
      return state;
  }
};
