import { createAction } from 'redux-actions';

export const CREATE_COURSE_PHASE_CHANGE = 'CREATE_COURSE_PHASE_CHANGE';

export const createCoursePhaseChange = createAction(
  CREATE_COURSE_PHASE_CHANGE,
  (amount = 1) => amount,
);
