import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from './../util/auth';

class BasicNavbar extends React.Component {  
  render() {
    const { showLeft, showRight } = this.props;
    return (
      <div>
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
                      <Link to='/login'>Log In</Link>
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
