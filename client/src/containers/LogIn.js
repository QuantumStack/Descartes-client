import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  inputChange, inputFocus, inputBlur, logIn,
} from '../actions';
import CenterBox from '../components/CenterBox';
import LogInForm from '../components/LogInForm';

class LogIn extends React.PureComponent {
  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    indicator: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    logIn: PropTypes.func.isRequired,
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

const mapStateToProps = ({ logIn: logInForm }) => logInForm;
const mapDispatchToProps = (dispatch, { location }) => ({
  handleChange: event => dispatch(inputChange('logIn', event)),
  handleFocus: event => dispatch(inputFocus('logIn', event)),
  handleBlur: () => dispatch(inputBlur('logIn')),
  logIn: (email, password) => dispatch(logIn(email, password, location.search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogIn));
