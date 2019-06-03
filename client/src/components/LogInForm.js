import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class LogInForm extends React.Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    indicator: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    logIn: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { logIn, email, password } = this.props;
    logIn(email, password);
  }

  render() {
    const {
      email, password, isLoading, indicator, handleChange, handleFocus, handleBlur,
    } = this.props;
    return (
      <div className="uk-child-width-expand@s" data-uk-grid>
        <div className="uk-text-center uk-text-middle">
          <span className="uk-animation-fade" style={{ fontSize: 140 }}>{indicator}</span>
        </div>
        <div>
          <form onSubmit={this.handleSubmit} data-uk-scrollspy="target: .uk-form-icon; cls: uk-animation-scale-up; delay: 100">
            <h4 className="uk-margin-remove-bottom">Log into Descartes</h4>
            <small>
              <span>Click </span>
              <Link to="/signup">here</Link>
              <span> to create an account</span>
            </small>
            <div className="uk-inline uk-margin-small-top">
              <span className="uk-form-icon" data-uk-icon="icon: user" />
              <input className="uk-input uk-form-width-large" type="email" name="email" placeholder="Email" value={email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} required />
            </div>
            <div className="uk-inline uk-margin-small">
              <span className="uk-form-icon" data-uk-icon="icon: lock" />
              <input className="uk-input uk-form-width-large" type="password" name="password" placeholder="Password" value={password} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} required />
            </div>
            <button className="uk-button uk-button-default uk-width-expand" type="submit">
              {isLoading ? (
                <div key="loading" data-uk-spinner="ratio: 0.5" />
              ) : (
                <div key="log-in">
                  <span>Log In</span>
                  <span data-uk-scrollspy="cls: uk-animation-slide-left-small; delay: 300" data-uk-icon="icon: arrow-right" />
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LogInForm;
