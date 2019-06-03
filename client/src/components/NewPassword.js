import React from 'react';
import PropTypes from 'prop-types';

class NewPassword extends React.PureComponent {
  static propTypes = {
    isChange: PropTypes.bool,
    password: PropTypes.string.isRequired,
    password2: PropTypes.string.isRequired,
    strength: PropTypes.number.isRequired,
    mismatch: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isChange: false,
  }

  makePassword(color, verify = false) {
    const {
      isChange, password, password2, onChange,
    } = this.props;
    return (
      <div className={`uk-inline uk-width-expand ${verify && !isChange ? 'uk-margin-small-top' : ''}`}>
        <span className="uk-form-icon" data-uk-icon={verify ? 'refresh' : 'lock'} />
        <input className={`uk-input ${color}`} type="password" name={verify ? 'password2' : 'password'} placeholder={isChange ? '' : `${verify ? 'Verify ' : ''}Password`} value={verify ? password2 : password} onChange={onChange} required={!isChange} />
      </div>
    );
  }

  render() {
    const {
      isChange, password, strength, mismatch,
    } = this.props;

    let strengthClass;
    let strengthMsg;
    if (password) {
      switch (strength) {
        case 3:
          strengthMsg = <small>Good password, but it could be stonger</small>;
          // fallsthrough
        case 4:
          strengthClass = 'uk-form-success';
          break;
        default:
          strengthClass = 'uk-form-danger';
          strengthMsg = <small className="uk-text-danger">Please use a stronger password</small>;
          break;
      }
    }

    return isChange ? (
      <div>
        <div className="uk-margin-small">
          <label className="uk-form-label">New Password</label>
          <div className="uk-form-controls">
            {this.makePassword(strengthClass)}
            {strengthMsg}
          </div>
        </div>
        <div className="uk-margin uk-margin-small-top">
          <label className="uk-form-label">Verify Password</label>
          <div className="uk-form-controls">
            {this.makePassword(mismatch ? 'uk-form-danger' : '', true)}
            {mismatch && <small className="uk-text-danger">Passwords do not match</small>}
          </div>
        </div>
      </div>
    ) : (
      <div>
        {this.makePassword(strengthClass)}
        {strengthMsg}
        {this.makePassword(mismatch ? 'uk-form-danger' : '', true)}
        {mismatch && <small className="uk-text-danger">Passwords do not match</small>}
      </div>
    );
  }
}

export default NewPassword;
