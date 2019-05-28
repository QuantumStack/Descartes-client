import React from 'react';
import { Helmet } from 'react-helmet';
import DataContainer from '../components/DataContainer';
import { ACCOUNT_URL } from '../util/api';
import AccountSettings from '../components/AccountSettings';

class Account extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Account | Descartes </title>
        </Helmet>
        <div className='uk-container'>
          <DataContainer url={ACCOUNT_URL}>
            <AccountSettings />
          </DataContainer>
        </div>
      </div>
    );
  }
}

export default Account;
