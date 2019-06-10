import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PaymentHistoryRow from './PaymentHistoryRow';

class PaymentHistoryTable extends React.PureComponent {
  static propTypes = {
    payments: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const { payments } = this.props;
    return payments.length > 0 ? (
      <div className="uk-overflow-auto uk-margin-small-top">
        <table className="uk-table uk-table-small uk-table-hover uk-table-divider">
          <thead>
            <tr>
              <th className="uk-table-expand">Course Name</th>
              <th>Plan</th>
              <th className="uk-table-expand">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => <PaymentHistoryRow key={payment.id} {...payment} />)}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="uk-text-danger uk-text-center uk-margin-top">
        <span>No courses here. Create one from the </span>
        <Link to="/dashboard">dashboard</Link>
        <span>.</span>
      </div>
    );
  }
}

export default PaymentHistoryTable;
