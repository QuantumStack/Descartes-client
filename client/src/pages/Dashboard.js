import React from 'react';
import { Helmet } from 'react-helmet';
import DataContainer from '../components/DataContainer';
import AllCourses from '../components/AllCourses';
import { OVERVIEW_URL } from '../util/api';

function Dashboard() {
  return (
    <div>
      <Helmet>
        <title>Dashboard | Descartes</title>
      </Helmet>
      <div className="uk-container">
        <DataContainer url={OVERVIEW_URL}>
          <AllCourses />
        </DataContainer>
      </div>
    </div>
  );
}

export default Dashboard;
