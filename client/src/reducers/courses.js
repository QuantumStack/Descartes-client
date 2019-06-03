import { normalize, schema } from 'normalizr';
import { LOG_OUT } from '../actions';
import { error } from '../util/alert';

export const updateCourse = (state, id, update) => {
  const courseItem = state.items[id];
  if (courseItem) return Object.assign({}, courseItem, update);
  return state;
};

export const coursesReducer = (
  DEHYDRATE, RECEIVE, COURSE_DEHYDRATE, COURSE_REQUEST, COURSE_RESPONSE,
) => {
  const defaultState = {
    isHydrated: false,
    items: {},
  };

  return (state = defaultState, { type, payload, error: err }) => {
    switch (type) {
      case LOG_OUT:
        return defaultState;
      case DEHYDRATE:
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
      case COURSE_DEHYDRATE:
        return updateCourse(state, payload, { isHydrated: false });
      case COURSE_REQUEST:
        return updateCourse(state, payload, { isLoading: true });
      case COURSE_RESPONSE:
        if (err) {
          error(null, payload.response);
          return updateCourse(state, payload.id, { isLoading: false });
        }
        return updateCourse(state, payload.id, {
          isLoading: false,
          isHydrated: true,
          data: payload.data,
        });
      default:
        return state;
    }
  };
};
