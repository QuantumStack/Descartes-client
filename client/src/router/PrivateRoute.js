import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../util/auth';
import UserContainer from '../containers/UserContainer';

class PrivateRoute extends React.PureComponent {
  static propTypes = {
    component: PropTypes.elementType.isRequired,
  };

  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => (isAuthenticated() ? (
          <UserContainer>
            <Component {...props} />
          </UserContainer>
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        ))}
      />
    );
  }
}

export default PrivateRoute;
