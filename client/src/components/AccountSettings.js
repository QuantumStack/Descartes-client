import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import LoadingLarge from './LoadingLarge';
import UserNavbar from './UserNavbar';
import NewPassword from './NewPassword';
import zxcvbn from 'zxcvbn';
import moment from 'moment';
import { ax, ACCOUNT_CHANGE_URL } from '../util/api';
import { date_format, plans } from '../config';
import { success, error } from '../util/alert';
import DashboardHeader from './DashboardHeader';

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      changePassword: this.props.location.pathname === '/dashboard/account/password',
      old_password: '',
      password: '',
      strength: 0,
      password2: '',
      mismatch: false,
      isLoading: false,
    };
    this.toggleChangePassword = this.toggleChangePassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleChangePassword() {
    this.setState(({ changePassword }) => ({ changePassword: !changePassword }));
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
    const { name, old_password, password, mismatch, strength } = this.state;
    if (name !== this.props.user.name || (old_password && password && !mismatch && strength >= 3)) {
      this.setState({ isLoading: true });
      ax.post(ACCOUNT_CHANGE_URL, { name, password })
        .then(() => {
          success('Your account has been updated.');
          this.props.updateData({ user: { name }}, () =>
            this.setState({ isLoading: false }));
        })
        .catch(({ response: res = {} }) =>
          error(res.statusText).then(() => this.setState({ isLoading: false })));
    }
  }

  render() {
    const { user, payments } = this.props;
    const { isLoading, name, email, changePassword, old_password, password, password2, mismatch, strength } = this.state;

    return (
      <div>
        <UserNavbar name={user.name} />
        <div className='uk-section uk-section-xsmall'>
          <div className='uk-container uk-container-xsmall'>
            <form className='uk-form-horizontal' onSubmit={this.handleSubmit} data-uk-scrollspy='target: .uk-form-icon; cls: uk-animation-scale-up; delay: 100'>
              <DashboardHeader>
                <h4>My Account</h4>
              </DashboardHeader>
              <div className='uk-margin'>
                <label className='uk-form-label'>Full Name</label>
                <div className='uk-form-controls'>
                  <div className='uk-inline uk-width-expand'>
                    <span className='uk-form-icon' data-uk-icon='icon: user' />
                    <input className='uk-input' type='text' name='name' value={name} onChange={this.handleInputChange} />
                  </div>
                </div>
              </div>
              <div className='uk-margin'>
                <label className='uk-form-label'>Email</label>
                <div className='uk-form-controls'>
                  <div className='uk-inline uk-width-expand'>
                    <span className='uk-form-icon' data-uk-icon='icon: mail' />
                    <input className='uk-input' type='text' name='name' value={email} disabled />
                  </div>
                </div>
              </div>
              <h4 className='uk-margin-small'>
                <a className='uk-text-emphasis' onClick={this.toggleChangePassword}>
                  <span>Change Password</span>
                  <span className='uk-margin-small-left' data-uk-icon={`chevron-${changePassword ? 'up' : 'down'}`} />
                </a>
              </h4>
              {changePassword && (
                <div data-uk-scrollspy='target: > div; cls: uk-animation-slide-top-small; delay: 100'>
                  <div className='uk-margin uk-margin-small-bottom'>
                    <label className='uk-form-label'>Old Password</label>
                    <div className='uk-form-controls'>
                      <div className='uk-inline uk-width-expand'>
                        <span className='uk-form-icon' data-uk-icon='icon: history' />
                        <input className='uk-input' type='password' name='old_password' value={old_password} onChange={this.handleInputChange} />
                      </div>
                    </div>
                  </div>
                  <NewPassword isChange password={password} password2={password2} strength={strength} mismatch={mismatch} onChange={this.handleInputChange} />
                </div>
              )}
              <div className='uk-flex uk-flex-right'>
                <button className='uk-button uk-button-primary' type='submit'>
                  {isLoading ? (
                    <div key='loading' data-uk-spinner='ratio: 0.5'></div>
                  ) : (
                    <div key='account-change'>
                      <span>Save </span>
                      <span data-uk-scrollspy='cls: uk-animation-slide-left-small; delay: 600' data-uk-icon='icon: check'></span>
                    </div>
                  )}
                </button>
              </div>
            </form>
            <h4 className='uk-margin-small-bottom'>Payment History</h4>
            {payments.length > 0 ? (
              <div className='uk-overflow-auto uk-margin-small-top'>
                <table className='uk-table uk-table-small uk-table-hover uk-table-divider'>
                  <thead>
                    <tr>
                      <th className='uk-table-expand'>Course Name</th>
                      <th>Plan</th>
                      <th className='uk-table-expand'>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map(({ name, id, plan, date }) => (
                      <tr key={id}>
                        <td><Link to={`/dashboard/instructor/${id}`}>{name}</Link></td>
                        <td>{plans.find(p => p.id === plan).name}</td>
                        <td><span data-uk-tooltip={`title: ${moment(date).format(date_format)}`}>{moment(date).fromNow()}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='uk-text-danger uk-text-center uk-margin-top'>No courses here. Add one using the button above.</div>
            )}
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default withRouter(AccountSettings);
