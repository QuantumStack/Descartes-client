import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import ReCaptcha from 'react-recaptcha';
import zxcvbn from 'zxcvbn';
import NewPassword from './NewPassword';
import { ax, SIGN_UP_URL, RESEND_URL } from '../util/api';
import { recaptcha_site_key } from '../config';
import { modal } from 'uikit';
import { error } from '../util/alert';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      strength: 0,
      password2: '',
      mismatch: false,
      agreement: false,
      recaptcha: '',
      isLoading: false,
      isSuccess: false,
    }
    this.verifyCallback = this.verifyCallback.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resendEmail = this.resendEmail.bind(this);
  }

  verifyCallback(response) {
    // TODO: remove verify token logging
    this.setState({ recaptcha: response });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    if (name.includes('password')) {
      this.setState(({ password, password2 }) =>
        ({ strength: zxcvbn(password).score, mismatch: password2 && password !== password2 }));
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, email, password, mismatch, strength, agreement, recaptcha } = this.state;
    if (name && email && password && !mismatch && strength >= 3 && agreement && recaptcha) {
      this.setState({ isLoading: true });
      ax.post(SIGN_UP_URL, { fullName: name, email, password, 'g-recaptcha-response': recaptcha })
        .then(() => this.setState({ isLoading: false, isSuccess: true }))
        .catch(({ response: res = {} }) => 
          error(res.statusText).then(() => this.setState({ isLoading: false })));
    }
  }

  resendEmail() {
    this.setState({ isLoading: true });
    const { email } = this.state;
    ax.post(RESEND_URL, { email })
      .then(() => {
        modal.alert('Sent! Check your inbox again');
        this.setState({ isLoading: false });
      })
      .catch(({ response: res = {} }) => {
        error(res.statusText).then(() => this.setState({ isLoading: false }));
      });
  }

  render() {
    const { name, email, password, password2, mismatch, strength, agreement, isLoading, isSuccess } = this.state;
    const { location } = this.props;
    
    return isSuccess ? (
      <div data-uk-scrollspy='target: h4, p, a; cls: uk-animation-scale-down; delay: 100'>
        <h4 className='uk-margin-small uk-text-success'>
          <span className='uk-icon' data-uk-icon='icon: check; ratio: 2' />
          <span className='uk-text-middle uk-margin-small-left'>Welcome!</span>
        </h4>
        <p className='uk-margin-remove-top uk-margin-small-bottom'>You should have received a <strong>confirmation email</strong>. Click the verification link, then proceed to log in.</p>
        <p>
          <a className='uk-button uk-button-default uk-button-small uk-margin-small-right' onClick={this.resendEmail}>
            {isLoading ? (
              <div key='loading' data-uk-spinner='ratio: 0.5'></div>
            ) : (
              <span key='resend-email'>Resend email</span>
            )}
          </a>
          <Link to={`/login${location.search}`} className='uk-button uk-button-primary uk-button-small'>
            <span>Log in</span>
            <span data-uk-icon='icon: sign-in' />
          </Link>
        </p>
      </div>
    ) : (
      <form onSubmit={this.handleSubmit} data-uk-scrollspy='target: .uk-form-icon; cls: uk-animation-scale-up; delay: 100'>
        <h4 className='uk-margin-remove-bottom'>Sign up</h4>
        <p className='uk-text-meta uk-margin-small uk-margin-remove-top uk-text-justify'>Creating an account and all student services are <strong>free</strong>, but you'll need to subscribe to a paid plan to register a course.</p>
        <div className='uk-inline uk-margin-small-top'>
          <span className='uk-form-icon' data-uk-icon='icon: user'></span>
          <input className='uk-input uk-form-width-large' type='text' name='name' placeholder='Full Name' value={name} onChange={this.handleInputChange} required />
        </div>
        <div className='uk-inline uk-margin-small'>
          <span className='uk-form-icon' data-uk-icon='icon: mail'></span>
          <input className='uk-input uk-form-width-large' type='email' name='email' placeholder='Email' value={email} onChange={this.handleInputChange} required />
        </div>
        <NewPassword password={password} password2={password2} strength={strength} mismatch={mismatch} onChange={this.handleInputChange} />
        <div className='uk-margin-small'>
          <label><input className='uk-checkbox' type='checkbox' name='agreement' checked={agreement} onChange={this.handleInputChange} required /> I agree to the <a data-uk-toggle='target: #legal-modal'>terms and conditions</a></label>
        </div>
        <div style={{ height: '74px' }}>
          <ReCaptcha sitekey={recaptcha_site_key} render='explicit' onloadCallback={() => { }} verifyCallback={this.verifyCallback} />
        </div>
        <button className='uk-button uk-button-default uk-width-expand uk-margin-small-top' type='submit'>
          {isLoading ? (
            <div key='loading' data-uk-spinner='ratio: 0.5'></div>
          ) : (
            <div key='sign-up'>
              <span>Get Started</span>
              <span data-uk-scrollspy='cls: uk-animation-slide-left-small; delay: 500' data-uk-icon='icon: arrow-right'></span>
            </div>
          )}
        </button>
      </form>
    );
  }
}

export default withRouter(SignUp);
