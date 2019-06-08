import { createActions } from 'redux-actions';
import { ax, INSTRUCTOR_URL, authHeader } from '../util/api';
import deauthenticateIfNeeded from './deauthenticateIfNeeded';

export const INSTRUCTOR_COURSE_REQUEST = 'INSTRUCTOR_COURSE_REQUEST';
export const INSTRUCTOR_COURSE_RESPONSE = 'INSTRUCTOR_COURSE_RESPONSE';

export const {
  instructorCourseRequest, instructorCourseResponse,
} = createActions(INSTRUCTOR_COURSE_REQUEST, INSTRUCTOR_COURSE_RESPONSE);

export const fetchInstructorCourse = id => (dispatch) => {
  dispatch(instructorCourseRequest());
  ax.get(INSTRUCTOR_URL, { params: { id }, headers: authHeader() })
    .then(({ data }) => {
      dispatch(instructorCourseResponse({ id, data: data.course }));
    })
    .catch((err) => {
      if (!deauthenticateIfNeeded(err.response, dispatch)) dispatch(instructorCourseResponse(err));
    });
};

export const fetchInstructorCourseIfNeeded = id => (dispatch, getState) => {
  const { instructorCourses: { items: { [id]: course } } } = getState();
  if (!course.isHydrated) dispatch(fetchInstructorCourse());
};
