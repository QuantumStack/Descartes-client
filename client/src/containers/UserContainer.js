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
    const { children } = this.props;
    return (
      <div className="uk-container">
        <UserNavbar {...this.props} />
        {children}
      </div>
    );
  }
}

const mapStateToProps = ({ user: { name } }) => ({ name });
const mapDispatchToProps = dispatch => bindActionCreators({ doLogOut }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
