import { createAction } from 'redux-actions';

export const STUDENT_COURSE_FAKE_SCORE = 'STUDENT_COURSE_FAKE_SCORE';

export const studentCourseFakeScore = createAction(
  STUDENT_COURSE_FAKE_SCORE,
  (id, score) => ({ id, score: Number(score) }),
);
