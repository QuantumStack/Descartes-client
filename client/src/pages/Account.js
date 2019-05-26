import React from 'react';
import { Helmet } from 'react-helmet';
import DataContainer from '../components/DataContainer';
import DashboardAccount from '../components/DashboardAccount';
import { ACCOUNT_URL } from '../util/api';

class Account extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Account | Descartes </title>
        </Helmet>
        <div className='uk-container'>
          <DataContainer url={ACCOUNT_URL}>
            <DashboardAccount />
          </DataContainer>
        </div>
      </div>
    );
  }
}

export default Account;
