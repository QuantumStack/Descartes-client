import React from 'react';
import { Helmet } from 'react-helmet';
import CenterBox from '../components/CenterBox';
import LogInForm from '../components/LogInForm';
import Foot from '../components/Foot';

class LogIn extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Log in | Descartes</title>
        </Helmet>
        <CenterBox width='2-5'>
          <LogInForm />
        </CenterBox>
        <Foot />
      </div>
    );
  }
}

export default LogIn;
