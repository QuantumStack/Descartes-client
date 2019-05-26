import React from 'react';
import { withRouter } from 'react-router-dom';
import { ax, LOG_IN_URL } from '../util/api';
import { authenticate } from '../util/auth';
import { modal } from 'uikit';

const DEFAULT_INDICATOR = '🐶';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      indicator: DEFAULT_INDICATOR,
      failure: false,
      isLoading: false,
    };
    this.goTo = this.goTo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  goTo(loc, search) {
    this.props.history.push(`/${loc}${search ? this.props.location.search : ''}`);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleInputFocus(event) {
    const name = event.target.name;
    let value;
    switch (name) {
      case 'email':
        value = '😯';
        break;
      case 'password':
        value = '🙈'
        break;
    }
    this.setState({ indicator: value });
  }

  handleInputBlur() {
    this.setState({ indicator: DEFAULT_INDICATOR });
  }

  handleSubmit(event) {
    event.preventDefault(); 
    const { email, password } = this.state;
    if (email && password) {
      this.setState({ isLoading: true, indicator: '✈️' });
      ax.post(LOG_IN_URL, { email, password })
      .then(res => {
        this.setState({ isLoading: false, indicator: '✅' });
        authenticate(res.data.token);
        if (this.props.location.search === '?type=student') this.goTo('enroll');
        else if (this.props.location.search === '?type=instructor') this.goTo('create');
        else this.goTo('dashboard');
      })
      .catch(res => this.setState({ isLoading: false, failure: true, indicator: '🚨' }));
    }
  }

  componentWillUnmount() {
    const logInModal = modal('#login-modal');
    if (logInModal) logInModal.hide();
  }

  render() {
    const { email, password, indicator, failure, isLoading } = this.state;
    return (
      <div className='uk-child-width-expand@s' data-uk-grid>
        <div className='uk-text-center uk-text-middle'>
          <span style={{ fontSize: 140 }}>{indicator}</span>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <h4 className='uk-margin-remove-bottom'>Log into Descartes</h4>
            <small>Click <a onClick={() => this.goTo('signup', true)}>here</a> to create an account</small>
            <div className='uk-inline uk-margin-small-top'>
              <span className='uk-form-icon' data-uk-icon='icon: user'></span>
              <input className='uk-input uk-form-width-large' type='email' name='email' placeholder='Email' value={email} onChange={this.handleInputChange} onFocus={this.handleInputFocus} onBlur={this.handleInputBlur} required />
            </div>
            <div className='uk-inline uk-margin-small'>
              <span className='uk-form-icon' data-uk-icon='icon: lock'></span>
              <input className='uk-input uk-form-width-large' type='password' name='password' placeholder='Password' value={password} onChange={this.handleInputChange} onFocus={this.handleInputFocus} onBlur={this.handleInputBlur} required />
            </div>
            <button className={`uk-button uk-button-${failure ? 'danger' : 'default'} uk-width-expand`} type='submit'>
              {isLoading ? (
                <div key='loading' data-uk-spinner='ratio: 0.5'></div>
              ) : (
                <div key='log-in'>
                  <span>Log In</span>
                  <span data-uk-icon='icon: arrow-right'></span>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginModal);
