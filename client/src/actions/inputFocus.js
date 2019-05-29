import { createAction } from 'redux-actions';

export const INPUT_FOCUS = 'INPUT_FOCUS';

export const inputFocus = createAction(
  INPUT_FOCUS,
  (space, event) => {
    const { target } = event;
    const { name } = target;
    return { space, name };
  },
);
