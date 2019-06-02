import { createAction } from 'redux-actions';
import inputChange from '../util/inputChange';

export const CREATE_COURSE_INPUT_CHANGE = 'CREATE_COURSE_INPUT_CHANGE';

export const createCourseInputChange = createAction(CREATE_COURSE_INPUT_CHANGE, inputChange);
