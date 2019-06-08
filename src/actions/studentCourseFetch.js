import { createActions } from 'redux-actions';
import { ax, STUDENT_URL, authHeader } from '../util/api';
import deauthenticateIfNeeded from './deauthenticateIfNeeded';

export const STUDENT_COURSE_REQUEST = 'STUDENT_COURSE_REQUEST';
export const STUDENT_COURSE_RESPONSE = 'STUDENT_COURSE_RESPONSE';

export const {
  studentCourseRequest, studentCourseResponse,
} = createActions(STUDENT_COURSE_REQUEST, STUDENT_COURSE_RESPONSE);

export const fetchStudentCourse = id => (dispatch) => {
  dispatch(studentCourseRequest(id));
  ax.get(STUDENT_URL, { params: { id }, headers: authHeader() })
    .then(({ data }) => dispatch(studentCourseResponse({ id, data: data.course })))
    .catch((err) => {
      if (!deauthenticateIfNeeded(err.response, dispatch)) dispatch(studentCourseResponse(err));
    });
};

export const fetchStudentCourseIfNeeded = id => (dispatch, getState) => {
  const { studentCourses: { items: { [id]: course } } } = getState();
  if (!course || !course.isHydrated) dispatch(fetchStudentCourse(id));
};
