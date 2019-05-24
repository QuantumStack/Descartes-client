import React from 'react';
import { Helmet } from 'react-helmet';
import CenterBox from '../components/CenterBox';
import PaymentContainer from '../components/PaymentContainer';
import CreateForm from '../components/CreateForm';

class LogIn extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Create a course | Descartes</title>
        </Helmet>
        <CenterBox navOptions={{ showRight: true }} width='uk-width-3-5@m uk-width-1-2@l uk-width-2-5@xl'>
          <PaymentContainer>
            <CreateForm />
          </PaymentContainer>
        </CenterBox>
      </div>
    );
  }
}

export default LogIn;
