import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import logIn from './logIn';
import signUp from './signUp';
import user from './user';
import payments from './payments';

export default history => combineReducers({
  router: connectRouter(history),
  logIn,
  signUp,
  user,
  payments,
});
