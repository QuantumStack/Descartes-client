import { createAction } from 'redux-actions';

export const INPUT_BLUR = 'INPUT_BLUR';

export const inputBlur = createAction(
  INPUT_BLUR,
  space => ({ space }),
);
