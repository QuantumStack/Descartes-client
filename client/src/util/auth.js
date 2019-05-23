import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const TOKEN_KEY = 'auth_token';

export const
  authenticate = token => localStorage.setItem(TOKEN_KEY, token),
  isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null,
  deauthenticate = () => localStorage.removeItem(TOKEN_KEY),
  getToken = () => localStorage.getItem(TOKEN_KEY);

export class PrivateRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return <Route {...rest} render={props => isAuthenticated() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
      )} />;
  }
}

export class UnprivateRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return <Route {...rest} render={props => isAuthenticated() ? (
      <Redirect to={{
        pathname: '/dashboard',
        state: { from: props.location }
      }} />
    ) : (
        <Component {...props} />
      )} />;
  }
}
