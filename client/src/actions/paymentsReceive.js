import { createAction } from 'redux-actions';

export const PAYMENTS_RECEIVE = 'PAYMENTS_RECEIVE';

export const paymentsReceive = createAction(PAYMENTS_RECEIVE);
