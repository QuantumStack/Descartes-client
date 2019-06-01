import { createSelector } from 'reselect';
import moment from 'moment';
import findPlan from '../util/plan';
import { dateFormat } from '../config';

export const getPayments = state => state.payments.items;

export const formatPayments = createSelector(
  [getPayments],
  payments => payments.map((payment) => {
    const planMatch = findPlan(payment.plan);
    const momentDate = moment(payment.date);
    return {
      ...payment,
      plan: planMatch ? planMatch.name : 'Unknown',
      exactDate: momentDate.format(dateFormat),
      relativeDate: momentDate.fromNow(),
    };
  }),
);
