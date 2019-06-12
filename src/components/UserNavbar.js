import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';

class UserNavbar extends React.PureComponent {
  static propTypes = {
    firstName: PropTypes.string,
    doLogOut: PropTypes.func.isRequired,
  };

  static defaultProps = {
    firstName: undefined,
  }

  render() {
    const { firstName, doLogOut } = this.props;
    const greeting = (
      <div data-uk-scrollspy="cls: uk-animation-slide-left-small">
        <span className="uk-text-middle">
          <span>Hello, </span>
          &nbsp;
          <strong>{firstName}</strong>
        </span>
        <span className="uk-margin-small-left uk-animation-scale-up" data-uk-icon="happy" />
      </div>
    );
    // TODO: close offcanvas when link is clicked
    const links = [
      <li key="get-help">
        <a>
          <span className="uk-margin-small-right" data-uk-icon="question" />
          <span> Get Help</span>
        </a>
      </li>,
      <NavLink options={{ to: '/dashboard/account' }} key="account-settings">
        <span className="uk-margin-small-right" data-uk-icon="cog" />
        <span> Account Settings</span>
      </NavLink>,
      <li className="uk-nav-divider" key="divider" />,
      <li key="log-out">
        <a onClick={doLogOut}>
          <span className="uk-margin-small-right" data-uk-icon="sign-out" />
          <span> Log out</span>
        </a>
      </li>,
    ];
    return (
      <div>
        <div id="user-navbar-offcanvas" data-uk-offcanvas="flip: true; overlay: true; mode: push">
          <div className="uk-offcanvas-bar">
            <button className="uk-offcanvas-close" type="button" data-uk-close />
            <h3>Descartes</h3>
            <ul className="uk-nav uk-nav-default">
              {firstName && <li className="uk-active">{greeting}</li>}
              <li className="uk-nav-header">Navigation</li>
              <li>
                <Link to="/dashboard">
                  <span className="uk-margin-small-right" data-uk-icon="thumbnails" />
                  <span> Dashboard</span>
                </Link>
              </li>
              {links}
            </ul>
          </div>
        </div>
        <div className="uk-navbar-container uk-navbar-transparent" data-uk-navbar>
          <div className="uk-navbar-left">
            <Link className="uk-navbar-item uk-logo" to="/dashboard">Descartes</Link>
            {firstName && (
              <div className="uk-navbar-item uk-text-uppercase uk-text-muted uk-visible@m">
                {greeting}
              </div>
            )}
          </div>
          <div className="uk-navbar-right">
            <a className="uk-navbar-toggle uk-hidden@m" data-uk-toggle="target: #user-navbar-offcanvas">
              <span className="uk-margin-small-right">Menu</span>
              <span data-uk-navbar-toggle-icon />
            </a>
            <ul className="uk-navbar-nav uk-visible@m">
              {links}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default UserNavbar;
