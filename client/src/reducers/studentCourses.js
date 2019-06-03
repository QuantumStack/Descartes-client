import { STUDENT_COURSES_DEHYDRATE, STUDENT_COURSES_RECEIVE } from '../actions';
import coursesReducer from './courses';

export default coursesReducer(STUDENT_COURSES_DEHYDRATE, STUDENT_COURSES_RECEIVE);
