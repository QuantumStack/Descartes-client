import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import CenterBox from '../components/CenterBox';
import LogInForm from '../components/LogInForm';

class LogIn extends React.PureComponent {
  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Log in | Descartes</title>
        </Helmet>
        <CenterBox width="uk-width-5-6 uk-width-1-2@m uk-width-1-3@xl">
          <LogInForm {...this.props} />
        </CenterBox>
      </div>
    );
  }
}

export default LogIn;
