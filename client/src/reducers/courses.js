import { normalize, schema } from 'normalizr';
import { LOG_OUT } from '../actions';

const instructorSchema = new schema.Entity('instructors', {}, { idAttribute: 'email' });
const categorySchema = new schema.Entity('categories');
const assignmentSchema = new schema.Entity('assignments', {
  category: categorySchema,
});
const courseSchema = new schema.Entity('courses', {
  instructors: [instructorSchema],
  assignments: [assignmentSchema],
  categories: [categorySchema],
}, {
  processStrategy: value => ({
    isLoading: false,
    isHydrated: true,
    ...value,
  }),
});
export const courseTemplate = courseSchema;

export const updateCourse = (state, id, update) => ({
  ...state,
  items: {
    ...state.items,
    [id]: Object.assign({}, state.items[id], update),
  },
});

export const coursesReducer = (
  DEHYDRATE, RECEIVE, COURSE_DEHYDRATE, COURSE_REQUEST, callback,
) => {
  const defaultState = {
    isHydrated: false,
    items: {},
    instructors: {},
    assignments: {},
    categories: {},
  };

  return (state = defaultState, action) => {
    const { type, payload } = action;
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
          items: Object.assign({}, courses, state.items),
        };
      }
      case COURSE_DEHYDRATE:
        return updateCourse(state, payload, { isHydrated: false });
      case COURSE_REQUEST:
        return updateCourse(state, payload, { isLoading: true });
      default:
        return callback(state, action);
    }
  };
};
