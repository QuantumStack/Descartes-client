import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReCaptcha from 'react-recaptcha';
import NewPassword from './NewPassword';
import { recaptchaSiteKey, passwordStrengthThreshold } from '../config';

class SignUp extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    strength: PropTypes.number.isRequired,
    password2: PropTypes.string.isRequired,
    mismatch: PropTypes.bool.isRequired,
    agreement: PropTypes.bool.isRequired,
    recaptcha: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isSuccess: PropTypes.bool.isRequired,
    redirect: PropTypes.string.isRequired,
    signUp: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    verifyCallback: PropTypes.func.isRequired,
    resendEmail: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.doResend = this.doResend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      name, email, password, mismatch, strength, agreement, recaptcha, signUp,
    } = this.props;
    if (name && email && password && !mismatch && strength >= passwordStrengthThreshold
      && agreement && recaptcha) {
      signUp(name, email, password, recaptcha);
    }
  }

  doResend() {
    const { email, resendEmail } = this.props;
    resendEmail(email);
  }

  render() {
    const {
      name,
      email,
      password,
      password2,
      mismatch,
      strength,
      agreement,
      isLoading,
      isSuccess,
      redirect,
      handleChange,
      verifyCallback,
    } = this.props;

    return isSuccess ? (
      <div data-uk-scrollspy="target: h4, p, a; cls: uk-animation-scale-down; delay: 100">
        <h4 className="uk-margin-small uk-text-success">
          <span className="uk-icon" data-uk-icon="icon: check; ratio: 2" />
          <span className="uk-text-middle uk-margin-small-left">Welcome!</span>
        </h4>
        <p className="uk-margin-remove-top uk-margin-small-bottom">
          <span>You should have received a </span>
          <strong>confirmation email</strong>
          <span>. Click the verification link, then proceed to log in.</span>
        </p>
        <p>
          <button type="button" className="uk-button uk-button-default uk-button-small uk-margin-small-right" onClick={this.doResend}>
            {isLoading ? (
              <div key="loading" data-uk-spinner="ratio: 0.5" />
            ) : (
              <span key="resend-email">Resend email</span>
            )}
          </button>
          <Link to={`/login${redirect}`} className="uk-button uk-button-primary uk-button-small">
            <span>Log in</span>
            <span data-uk-icon="icon: sign-in" />
          </Link>
        </p>
      </div>
    ) : (
      <form onSubmit={this.handleSubmit} data-uk-scrollspy="target: .uk-form-icon; cls: uk-animation-scale-up; delay: 100">
        <h4 className="uk-margin-remove-bottom">Sign up</h4>
        <p className="uk-text-meta uk-margin-small uk-text-justify">
          <span>Creating an account and all student services are </span>
          <strong>free</strong>
          <span>, but you&apos;ll need to subscribe to a paid plan to register a course.</span>
        </p>
        <div className="uk-inline uk-margin-small-top">
          <span className="uk-form-icon" data-uk-icon="icon: user" />
          <input className="uk-input uk-form-width-large" type="text" name="name" placeholder="Full Name" value={name} onChange={handleChange} required />
        </div>
        <div className="uk-inline uk-margin-small">
          <span className="uk-form-icon" data-uk-icon="icon: mail" />
          <input className="uk-input uk-form-width-large" type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
        </div>
        <NewPassword password={password} password2={password2} strength={strength} mismatch={mismatch} onChange={handleChange} />
        <div className="uk-margin-small">
          <label htmlFor="sign-up-agreement">
            <input id="sign-up-agreement" className="uk-checkbox" type="checkbox" name="agreement" checked={agreement} onChange={handleChange} required />
            <span> I agree to the </span>
            <a data-uk-toggle="target: #legal-modal">terms and conditions</a>
          </label>
        </div>
        <div style={{ height: '74px' }}>
          <ReCaptcha sitekey={recaptchaSiteKey} render="explicit" onloadCallback={() => { }} verifyCallback={verifyCallback} />
        </div>
        <button className="uk-button uk-button-default uk-width-expand uk-margin-small-top" type="submit">
          {isLoading ? (
            <div key="loading" data-uk-spinner="ratio: 0.5" />
          ) : (
            <div key="sign-up">
              <span>Get Started</span>
              <span data-uk-scrollspy="cls: uk-animation-slide-left-small; delay: 500" data-uk-icon="icon: arrow-right" />
            </div>
          )}
        </button>
      </form>
    );
  }
}

export default SignUp;
