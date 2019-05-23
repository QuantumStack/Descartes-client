import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './../components/LoginModal';

class Navbar extends Component {
  render() {
    return (
      <div>
        <LoginModal />
        <div className='uk-navbar-container uk-navbar-transparent' data-uk-navbar>
          <div className='uk-navbar-center'>
            <div className='uk-navbar-center-left'><div>
              <ul className='uk-navbar-nav'>
                <li><a href='#about' data-uk-scroll>About</a></li>
              </ul>
            </div></div>
            <Link className='uk-navbar-item uk-logo' to='/'>Descartes</Link>
            <div className='uk-navbar-center-right'><div>
              <ul className='uk-navbar-nav'>
                <li><a data-uk-toggle='target: #login-modal'>Log In</a></li>
              </ul>
            </div></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar;