import { handleActions } from 'redux-actions';
import { inputChange } from '../actions/inputChange';
import initialState from './initialState';

const reducer = handleActions(
  {
    [inputChange]: (state, { payload: { space, name, value } }) => ({
      ...state,
      [space]: {
        [name]: value,
      },
    }),
  },
  initialState,
);

export default reducer;
