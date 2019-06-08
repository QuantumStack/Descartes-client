import { createAction } from 'redux-actions';

export const STUDENT_COURSE_FAKE_ASSIGNMENT = 'STUDENT_COURSE_ASSIGNMENT';

export const studentCourseFakeAssignment = createAction(
  STUDENT_COURSE_FAKE_ASSIGNMENT,
  (name, fakeScore, outOf, category) => ({
    id: `fake-${Date.now()}`, name, fakeScore, outOf, category,
  }),
);
