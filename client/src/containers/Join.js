import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { joinInputChange, joinCourse } from '../actions';
import CenterBox from '../components/CenterBox';
import JoinForm from '../components/JoinForm';

class Join extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>Join a course | Descartes</title>
        </Helmet>
        <CenterBox navOptions={{ showRight: true }} width="uk-width-5-6 uk-width-1-2@s uk-width-1-3@m uk-width-1-4@l uk-width-1-5@xl">
          <JoinForm {...this.props} />
        </CenterBox>
      </div>
    );
  }
}

const mapStateToProps = ({ join }, { match: { params } }) => ({
  ...join,
  code: params.code || join.code,
  showInput: !params.code,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  handleChange: joinInputChange,
  doJoin: joinCourse,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Join));
