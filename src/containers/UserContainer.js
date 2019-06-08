import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userFetchIfNeeded, doLogOut } from '../actions';
import UserNavbar from '../components/UserNavbar';

class UserContainer extends React.PureComponent {
  static propTypes = {
    fetchUserIfNeeded: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    const { fetchUserIfNeeded } = this.props;
    fetchUserIfNeeded();
  }

  render() {
    const { children } = this.props;
    const navbar = <UserNavbar {...this.props} />;
    return React.Children.map(children, child => React.cloneElement(child, { navbar }));
  }
}

const mapStateToProps = ({ user: { firstName } }) => ({ firstName });
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUserIfNeeded: userFetchIfNeeded,
  doLogOut,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
