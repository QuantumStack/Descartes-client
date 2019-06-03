import { normalize, schema } from 'normalizr';
import { LOG_OUT } from '../actions';

export default (HYDRATE, RECEIVE) => {
  const defaultState = {
    isHydrated: false,
    items: {},
  };

  return (state = defaultState, { type, payload }) => {
    switch (type) {
      case LOG_OUT:
        return defaultState;
      case HYDRATE:
        return {
          ...state,
          isHydrated: false,
        };
      case RECEIVE: {
        const courseSchema = new schema.Entity('courses');
        const { entities: { courses } } = normalize(payload, [courseSchema]);
        return {
          ...state,
          isHydrated: true,
          items: Object.assign({}, state.items, courses),
        };
      }
      default:
        return state;
    }
  };
};
