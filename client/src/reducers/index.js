import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import logIn from './logIn';
import signUp from './signUp';

export default history => combineReducers({
  router: connectRouter(history),
  logIn,
  signUp,
});
