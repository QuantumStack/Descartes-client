import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import findPlan from '../util/plan';

class PaymentHistoryRow extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    plan: PropTypes.string.isRequired,
    exactDate: PropTypes.string.isRequired,
    relativeDate: PropTypes.string.isRequired,
  }

  render() {
    const {
      id, name, plan, exactDate, relativeDate,
    } = this.props;
    const planMatch = findPlan(plan);

    return (
      <tr>
        <td><Link to={`/dashboard/instructor/${id}`}>{name}</Link></td>
        <td>{planMatch ? planMatch.name : 'Unknown'}</td>
        <td><span data-uk-tooltip={`title: ${exactDate}`}>{relativeDate}</span></td>
      </tr>
    );
  }
}

export default PaymentHistoryRow;
