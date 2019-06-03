import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import RouterPropTypes from 'react-router-prop-types';
import LoadingLarge from '../components/LoadingLarge';
import UserContainer from './UserContainer';
import StudentCourse from '../components/StudentCourse';
import { fetchStudentCourseIfNeeded } from '../actions';

class Student extends React.PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    fetchIfNeeded: PropTypes.func.isRequired,
    match: RouterPropTypes.match.isRequired,
  }

  static defaultProps = {
    isLoading: true,
  }

  componentDidMount() {
    const { fetchIfNeeded, match } = this.props;
    fetchIfNeeded(match.params.id);
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div>
        <LoadingLarge isLoading={isLoading}>
          <div className="uk-container">
            <UserContainer>
              <StudentCourse {...this.props} />
            </UserContainer>
          </div>
        </LoadingLarge>
      </div>
    );
  }
}

const mapStateToProps = ({ studentCourses }, { match }) => ({
  ...(studentCourses.items[match.params.id] || {}),
});
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchIfNeeded: fetchStudentCourseIfNeeded,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Student));
