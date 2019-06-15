import React from 'react';
import PropTypes from 'prop-types';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { stripeApiKey } from '../config';

class PaymentContainer extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props;
    return (
      <StripeProvider apiKey={stripeApiKey}>
        <Elements>
          {children}
        </Elements>
      </StripeProvider>
    );
  }
}

export default PaymentContainer;
