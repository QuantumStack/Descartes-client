import { INSTRUCTOR_COURSES_DEHYDRATE, INSTRUCTOR_COURSES_RECEIVE } from '../actions';
import coursesReducer from './courses';

export default coursesReducer(INSTRUCTOR_COURSES_DEHYDRATE, INSTRUCTOR_COURSES_RECEIVE);
