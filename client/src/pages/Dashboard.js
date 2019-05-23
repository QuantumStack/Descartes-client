import React from 'react';
import { Helmet } from 'react-helmet';
import UserNavbar from '../components/UserNavbar';

class Dashboard extends React.Component {
  render() {
    return <div>
      <Helmet>
        <title>Dashboard | Descartes</title>
      </Helmet>
      <UserNavbar name='Ashwin' />
    </div>;
  }
}

export default Dashboard;
