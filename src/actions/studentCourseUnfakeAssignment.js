import { createAction } from 'redux-actions';

export const STUDENT_COURSE_UNFAKE_ASSIGNMENT = 'STUDENT_COURSE_UNFAKE_ASSIGNMENT';

export const studentCourseUnfakeAssignment = createAction(
  STUDENT_COURSE_UNFAKE_ASSIGNMENT,
  (id, fakeId) => ({ id, fakeId }),
);
