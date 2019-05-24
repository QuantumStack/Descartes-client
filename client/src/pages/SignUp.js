import React from 'react';
import { Helmet } from 'react-helmet';
import CenterBox from '../components/CenterBox';
import SignUpForm from '../components/SignUpForm';

class SignUp extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Sign up | Descartes</title>
          <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
        </Helmet>
        <CenterBox navOptions={{ showRight: true }} width='uk-width-1-2@s uk-width-1-3@l uk-width-1-4@xl'>
          <SignUpForm />
        </CenterBox>
      </div>
    );
  }
}

export default SignUp;
