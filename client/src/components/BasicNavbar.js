import React from 'react';
import { Link } from 'react-router-dom';
import LogInForm from './LogInForm';
import Modal from './Modal';
import { isAuthenticated } from './../util/auth';

class BasicNavbar extends React.Component {  
  render() {
    const { showLeft, showRight } = this.props;
    return (
      <div>
        <Modal name='login'>
          <LogInForm />
        </Modal>
        <div className='uk-navbar-container uk-navbar-transparent' data-uk-navbar>
          <div className='uk-navbar-center'>
            {showLeft && 
              <div className='uk-navbar-center-left'><div>
                <ul className='uk-navbar-nav'>
                  <li><a href='#about' data-uk-scroll>About</a></li>
                </ul>
              </div></div>
            }
            <Link className='uk-navbar-item uk-logo' to='/'>Descartes</Link>
            {showRight && 
              <div className='uk-navbar-center-right'><div>
                <ul className='uk-navbar-nav'>
                  <li>
                    {isAuthenticated() ? (
                      <Link to='/dashboard'>Dashboard</Link>
                    ) : (
                      <a data-uk-toggle='target: #login-modal'>Log In</a>
                    )}
                  </li>
                </ul>
              </div></div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default BasicNavbar;
