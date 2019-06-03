import { createActions } from 'redux-actions';
import { ax, STUDENT_URL, authHeader } from '../util/api';
import deauthenticateIfNeeded from './deauthenticateIfNeeded';
import { userResponse } from './userFetch';

export const STUDENT_COURSE_REQUEST = 'STUDENT_COURSE_REQUEST';
export const STUDENT_COURSE_RESPONSE = 'STUDENT_COURSE_RESPONSE';

export const {
  studentCourseRequest, studentCourseResponse,
} = createActions(STUDENT_COURSE_REQUEST, STUDENT_COURSE_RESPONSE);

export const fetchstudentCourse = id => (dispatch) => {
  dispatch(studentCourseRequest());
  ax.get(STUDENT_URL, { params: { id }, headers: authHeader() })
    .then(({ data }) => {
      dispatch(userResponse(data.user));
      dispatch(studentCourseResponse({ id, data: data.course }));
    })
    .catch((err) => {
      if (!deauthenticateIfNeeded(err.response, dispatch)) dispatch(studentCourseResponse(err));
    });
};

export const fetchstudentCourseIfNeeded = id => (dispatch, getState) => {
  const { studentCourses: { items: { [id]: course } } } = getState();
  if (!course.isHydrated) dispatch(fetchstudentCourse());
};
