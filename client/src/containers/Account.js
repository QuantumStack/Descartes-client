import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import LoadingLarge from '../components/LoadingLarge';
import AccountSettings from '../components/AccountSettings';
import { userFetchIfNeeded, userChange, userInputChange } from '../actions';
import { formatPayments } from '../selectors';
import UserContainer from './UserContainer';

class Account extends React.PureComponent {
  static propTypes = {
    isHydrated: PropTypes.bool.isRequired,
    fetchIfNeeded: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { fetchIfNeeded } = this.props;
    fetchIfNeeded();
  }

  componentDidUpdate() {
    const { fetchIfNeeded } = this.props;
    fetchIfNeeded();
  }

  render() {
    const { isHydrated } = this.props;
    return (
      <div>
        <Helmet>
          <title>Account | Descartes </title>
        </Helmet>
        <LoadingLarge isLoading={!isHydrated}>
          <div className="uk-container">
            <UserContainer>
              <AccountSettings {...this.props} />
            </UserContainer>
          </div>
        </LoadingLarge>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.user,
  isHydrated: state.user.isHydrated && state.payments.isHydrated,
  payments: formatPayments(state),
  changePassword: state.router.location.pathname === '/dashboard/account/password',
});
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchIfNeeded: userFetchIfNeeded,
  editUser: userChange,
  handleChange: userInputChange,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Account);
