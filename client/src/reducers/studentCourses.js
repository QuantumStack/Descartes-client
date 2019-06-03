import {
  STUDENT_COURSES_DEHYDRATE,
  STUDENT_COURSES_RECEIVE,
  STUDENT_COURSE_DEHYDRATE,
  STUDENT_COURSE_REQUEST,
  STUDENT_COURSE_RESPONSE,
} from '../actions';
import { coursesReducer } from './courses';

export default coursesReducer(
  STUDENT_COURSES_DEHYDRATE,
  STUDENT_COURSES_RECEIVE,
  STUDENT_COURSE_DEHYDRATE,
  STUDENT_COURSE_REQUEST,
  STUDENT_COURSE_RESPONSE,
);
