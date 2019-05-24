import React from 'react';
import { stripe_api_key } from '../config';
import { StripeProvider, Elements } from 'react-stripe-elements';

class PaymentContainer extends React.Component {
  render() {
    return (
      <StripeProvider apiKey={stripe_api_key}>
        <Elements>
          {this.props.children}
        </Elements>
      </StripeProvider>
    )
  }
}

export default PaymentContainer;
