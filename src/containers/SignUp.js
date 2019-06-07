import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import {
  signUp, signUpInputChange, signUpCaptcha, signUpResend,
} from '../actions';
import CenterBox from '../components/CenterBox';
import SignUpForm from '../components/SignUpForm';

class SignUp extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>Sign up | Descartes</title>
          <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer />
        </Helmet>
        <CenterBox navOptions={{ showRight: true }} width="uk-width-1-2@s uk-width-1-3@l uk-width-1-4@xl">
          <SignUpForm {...this.props} />
        </CenterBox>
      </div>
    );
  }
}

const mapStateToProps = ({ signUp: signUpForm, router }) => ({
  ...signUpForm,
  redirect: router.location.search,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  signUp,
  handleChange: signUpInputChange,
  verifyCallback: signUpCaptcha,
  resendEmail: signUpResend,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
