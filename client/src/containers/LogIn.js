import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import {
  logIn, logInInputChange, logInInputFocus, logInInputBlur,
} from '../actions';
import CenterBox from '../components/CenterBox';
import LogInForm from '../components/LogInForm';

class LogIn extends React.PureComponent {
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

const mapStateToProps = ({ logIn: logInForm, router }) => ({
  ...logInForm,
  redirect: router.location.search,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  logIn,
  handleChange: logInInputChange,
  handleFocus: logInInputFocus,
  handleBlur: logInInputBlur,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
