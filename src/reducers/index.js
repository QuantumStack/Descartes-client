import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import logIn from './logIn';
import signUp from './signUp';
import verify from './verify';
import user from './user';
import payments from './payments';
import dashboard from './dashboard';
import create from './create';
import join from './join';
import instructorCourses from './instructorCourses';
import studentCourses from './studentCourses';

export default history => combineReducers({
  router: connectRouter(history),
  logIn,
  signUp,
  verify,
  user,
  payments,
  dashboard,
  create,
  join,
  instructorCourses,
  studentCourses,
});
