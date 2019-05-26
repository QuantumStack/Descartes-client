import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class NavLink extends React.Component {
  render() {
    const { children, ...options } = this.props;
    return (
      <li className={this.props.location.pathname === options.to ? 'uk-active' : ''}>
        <Link {...options}>
          {children}
        </Link>
      </li>
    )
  }
}

export default withRouter(NavLink);
