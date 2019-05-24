import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { deauthenticate } from '../util/auth';

class UserNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.doLogout = this.doLogout.bind(this);
  }

  doLogout() {
    deauthenticate();
    this.props.history.push('/');
  }

  render() {
    const { name } = this.props;
    const greeting = (
      <div data-uk-scrollspy='cls: uk-animation-slide-left-small'>
        <span className='uk-text-middle'>Hello,&nbsp;<strong>{name}</strong></span>
        <span className='uk-margin-small-left' data-uk-icon='icon: happy'></span>
      </div>
    );
    const links = [
      <li><a><span className='uk-margin-small-right' data-uk-icon='icon: question'></span> Get Help</a></li>,
      <li><Link to='/dashboard/account'><span className='uk-margin-small-right' uk-icon='icon: cog'></span> Account Settings</Link></li>,
      <li className='uk-nav-divider'></li>,
      <li><a onClick={this.doLogout}><span className='uk-margin-small-right' uk-icon='icon: sign-out'></span> Log out</a></li>,
    ];
    return (
      <div>
        <div id='user-navbar-offcanvas' data-uk-offcanvas='flip: true; overlay: true; mode: push'>
          <div className='uk-offcanvas-bar'>
            <button className='uk-offcanvas-close' type='button' data-uk-close></button>
            <h3>Descartes</h3>
            <ul className='uk-nav uk-nav-default'>
              <li className='uk-active'>{greeting}</li>
              <li className='uk-nav-header'>Navigation</li>
              {links}
            </ul>
          </div>
        </div>
        <div className='uk-navbar-container uk-navbar-transparent' data-uk-navbar>
          <div className='uk-navbar-left'>
            <Link className='uk-navbar-item uk-logo' to='/'>Descartes</Link>
            <div className='uk-navbar-item uk-text-uppercase uk-text-muted uk-visible@m'>
              {greeting}
            </div>
          </div>
          <div className='uk-navbar-right'>
            <a className='uk-navbar-toggle uk-hidden@m' data-uk-toggle='target: #user-navbar-offcanvas'>
              <span className='uk-margin-small-right'>Menu</span>
              <span data-uk-navbar-toggle-icon />
            </a>
            <ul className='uk-navbar-nav uk-visible@m'>
              {links}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserNavbar);
