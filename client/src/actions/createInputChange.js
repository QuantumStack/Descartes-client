import { createAction } from 'redux-actions';
import inputChange from '../util/inputChange';

export const CREATE_INPUT_CHANGE = 'CREATE_INPUT_CHANGE';

export const createInputChange = createAction(CREATE_INPUT_CHANGE, inputChange);
