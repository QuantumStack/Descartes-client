import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import logIn from './logIn';
import signUp from './signUp';
import verify from './verify';
import user from './user';
import payments from './payments';
import create from './create';
import join from './join';

export default history => combineReducers({
  router: connectRouter(history),
  logIn,
  signUp,
  verify,
  user,
  payments,
  create,
  join,
});
