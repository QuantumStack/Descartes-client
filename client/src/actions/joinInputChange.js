import { createAction } from 'redux-actions';
import inputChange from '../util/inputChange';

export const JOIN_INPUT_CHANGE = 'JOIN_INPUT_CHANGE';

export const joinInputChange = createAction(JOIN_INPUT_CHANGE, inputChange);
