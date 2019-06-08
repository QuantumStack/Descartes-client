import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import RouterPropTypes from 'react-router-prop-types';

class NavLink extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    options: PropTypes.object.isRequired,
    location: RouterPropTypes.location.isRequired,
  }

  render() {
    const { children, options, location } = this.props;
    return (
      <li className={location.pathname === options.to ? 'uk-active' : ''}>
        <Link {...options}>
          {children}
        </Link>
      </li>
    );
  }
}

export default withRouter(NavLink);
