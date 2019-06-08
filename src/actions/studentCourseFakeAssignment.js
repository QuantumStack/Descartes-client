import { createAction } from 'redux-actions';

export const STUDENT_COURSE_FAKE_ASSIGNMENT = 'STUDENT_COURSE_FAKE_ASSIGNMENT';

export const studentCourseFakeAssignment = createAction(
  STUDENT_COURSE_FAKE_ASSIGNMENT,
  (id, name, fakeScore, outOf, category) => ({
    id, name, fakeScore: Number(fakeScore), outOf: Number(outOf), category,
  }),
);
