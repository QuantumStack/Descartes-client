import React from 'react';
import { Helmet } from 'react-helmet';
import AccountSettings from '../components/AccountSettings';

class Account extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>Account | Descartes </title>
        </Helmet>
        <div className='uk-container'>
          <AccountSettings />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ })

export default Account;
