import { createAction } from 'redux-actions';
import inputChange from '../util/inputChange';

export const USER_INPUT_CHANGE = 'USER_INPUT_CHANGE';

export const userInputChange = createAction(USER_INPUT_CHANGE, inputChange);
