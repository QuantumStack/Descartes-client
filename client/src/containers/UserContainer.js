import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doLogOut } from '../actions';
import UserNavbar from '../components/UserNavbar';

class UserContainer extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const navbar = <UserNavbar {...this.props} />;
    const { children } = this.props;
    return React.Children.map(children, child => React.cloneElement(child, { navbar }));
  }
}

const mapStateToProps = ({ user: { name } }) => ({ name });
const mapDispatchToProps = dispatch => bindActionCreators({ doLogOut }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
