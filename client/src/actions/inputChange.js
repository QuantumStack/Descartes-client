import { createAction } from 'redux-actions';

export const INPUT_CHANGE = 'INPUT_CHANGE';

export const inputChange = createAction(
  INPUT_CHANGE,
  (space, event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    return { space, name, value };
  },
);
