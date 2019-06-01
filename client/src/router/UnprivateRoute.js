import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../util/auth';

class UnprivateRoute extends React.PureComponent {
  static propTypes = {
    component: PropTypes.elementType.isRequired,
  };

  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => (isAuthenticated() ? (
          <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        ))}
      />
    );
  }
}

export default UnprivateRoute;
