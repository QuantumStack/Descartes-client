import { createSelector } from 'reselect';
import moment from 'moment';
import { plans, date_format } from '../config';

export const getPayments = state => state.payments.items;

export const formatPayments = createSelector(
  [getPayments],
  payments => payments.map((payment) => {
    const planName = plans.find(plan => plan.id === payment.plan);
    const momentDate = moment(payment.date);
    return {
      ...payment,
      plan: planName || 'Unknown',
      exactDate: momentDate.format(date_format),
      relativeDate: momentDate.fromNow(),
    };
  }),
);
