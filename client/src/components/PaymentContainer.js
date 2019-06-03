import React from 'react';
import { stripeApiKey } from '../config';
import { StripeProvider, Elements } from 'react-stripe-elements';

class PaymentContainer extends React.Component {
  render() {
    return (
      <StripeProvider apiKey={stripeApiKey}>
        <Elements>
          {this.props.children}
        </Elements>
      </StripeProvider>
    )
  }
}

export default PaymentContainer;
