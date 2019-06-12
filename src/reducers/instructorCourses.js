import { normalize } from 'normalizr';
import {
  INSTRUCTOR_COURSES_DEHYDRATE,
  INSTRUCTOR_COURSES_RECEIVE,
  INSTRUCTOR_COURSE_DEHYDRATE,
  INSTRUCTOR_COURSE_REQUEST,
  INSTRUCTOR_COURSE_RESPONSE,
} from '../actions';
import { coursesReducer, updateCourse, courseTemplate } from './courses';
import { error } from '../util/alert';

export default coursesReducer(
  INSTRUCTOR_COURSES_DEHYDRATE,
  INSTRUCTOR_COURSES_RECEIVE,
  INSTRUCTOR_COURSE_DEHYDRATE,
  INSTRUCTOR_COURSE_REQUEST,
  (state, { type, payload, error: err }) => {
    switch (type) {
      case INSTRUCTOR_COURSE_RESPONSE: {
        if (err) {
          error(null, payload.response);
          return updateCourse(state, payload.id, { isLoading: false });
        }
        const {
          entities: {
            courses, instructors, assignments, categories,
          },
        } = normalize(payload.data, courseTemplate);
        return {
          ...state,
          items: Object.assign({}, state.items, courses),
          instructors: Object.assign({}, state.instructors, instructors),
          assignments: Object.assign({}, state.assignments, assignments),
          categories: Object.assign({}, state.categories, categories),
        };
      }
      default:
        return state;
    }
  },
);
