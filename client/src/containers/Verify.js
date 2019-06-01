import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { userVerify } from '../actions';
import CenterBox from '../components/CenterBox';
import VerifyDialog from '../components/VerifyDialog';

class Verify extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>Verify your account | Descartes</title>
        </Helmet>
        <CenterBox navOptions={{ showRight: true }} width="uk-width-5-6 uk-width-1-3@s uk-width-1-4@m uk-width-1-5@l uk-width-1-6@xl">
          <VerifyDialog {...this.props} />
        </CenterBox>
      </div>
    );
  }
}

const mapStateToProps = ({ verify }) => verify;
const mapDispatchToProps = dispatch => bindActionCreators({ doVerify: userVerify }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Verify);
