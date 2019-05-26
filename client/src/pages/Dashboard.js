import React from 'react';
import { Helmet } from 'react-helmet';
import DataContainer from '../components/DataContainer';
import DashboardCourses from '../components/DashboardCourses';
import { OVERVIEW_URL } from '../util/api';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Dashboard | Descartes</title>
        </Helmet>
        <div className='uk-container'>
          <DataContainer url={OVERVIEW_URL}>
            <DashboardCourses />
          </DataContainer>
        </div>
      </div>
    );
  }
}

export default Dashboard;
