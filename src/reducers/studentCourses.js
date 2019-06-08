import { normalize } from 'normalizr';
import {
  STUDENT_COURSES_DEHYDRATE,
  STUDENT_COURSES_RECEIVE,
  STUDENT_COURSE_DEHYDRATE,
  STUDENT_COURSE_REQUEST,
  STUDENT_COURSE_RESPONSE,
  STUDENT_COURSE_FAKE_SCORE,
  STUDENT_COURSE_UNFAKE_SCORE,
  STUDENT_COURSE_FAKE_ASSIGNMENT,
  STUDENT_COURSE_UNFAKE_ASSIGNMENT,
  STUDENT_COURSE_SCORE_RESET,
} from '../actions';
import { coursesReducer, updateCourse, courseTemplate } from './courses';
import { error } from '../util/alert';

export default coursesReducer(
  STUDENT_COURSES_DEHYDRATE,
  STUDENT_COURSES_RECEIVE,
  STUDENT_COURSE_DEHYDRATE,
  STUDENT_COURSE_REQUEST,
  (state, { type, payload, error: err }) => {
    switch (type) {
      case STUDENT_COURSE_RESPONSE: {
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
      case STUDENT_COURSE_FAKE_SCORE:
        return {
          ...state,
          assignments: {
            ...state.assignments,
            [payload.id]: {
              ...state.assignments[payload.id],
              fakeScore: payload.score,
            },
          },
        };
      case STUDENT_COURSE_UNFAKE_SCORE:
        return {
          ...state,
          assignments: {
            ...state.assignments,
            [payload]: {
              ...state.assignments[payload],
              fakeScore: null,
            },
          },
        };
      case STUDENT_COURSE_FAKE_ASSIGNMENT: {
        const fakeId = `fake-${payload.id}-${Date.now()}`;
        const courseItem = state.items[payload.id];
        return {
          ...state,
          assignments: {
            ...state.assignments,
            [fakeId]: {
              ...payload,
              id: fakeId,
              isFake: true,
            },
          },
          items: {
            ...state.items,
            [courseItem.id]: {
              ...courseItem,
              assignments: [
                ...courseItem.assignments,
                fakeId,
              ],
            },
          },
        };
      }
      case STUDENT_COURSE_UNFAKE_ASSIGNMENT: {
        const { [payload.fakeId]: fake, ...rest } = state.assignments;
        const courseItem = state.items[payload.id];
        return {
          ...state,
          assignments: rest,
          items: {
            ...state.items,
            [courseItem.id]: {
              ...courseItem,
              assignments: courseItem.assignments.filter(id => id !== payload.fakeId),
            },
          },
        };
      }
      case STUDENT_COURSE_SCORE_RESET: {
        const courseAssignments = state.items[payload].assignments.reduce((obj, id) => ({
          ...obj,
          [id]: {
            ...state.assignments[id],
            fakeScore: null,
          },
        }), {});
        return {
          ...state,
          assignments: Object.assign({}, state.assignments, courseAssignments),
        };
      }
      default:
        return state;
    }
  },
);
