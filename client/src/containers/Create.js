import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { createInputChange, createCourse } from '../actions';
import CenterBox from '../components/CenterBox';
import PaymentContainer from '../components/PaymentContainer';
import CreateForm from '../components/CreateForm';

class Create extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>Create a course | Descartes</title>
        </Helmet>
        <CenterBox navOptions={{ showRight: true }} width="uk-width-3-5@m uk-width-1-2@l uk-width-2-5@xl">
          <PaymentContainer>
            <CreateForm {...this.props} />
          </PaymentContainer>
        </CenterBox>
      </div>
    );
  }
}

const mapStateToProps = ({ create: createForm }) => createForm;
const mapDispatchToProps = dispatch => bindActionCreators({
  handleChange: createInputChange,
  doCreate: createCourse,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Create);
