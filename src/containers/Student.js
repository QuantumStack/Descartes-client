import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import LoadingLarge from '../components/LoadingLarge';
import UserContainer from './UserContainer';
import StudentCourse from '../components/StudentCourse';
import { studentCourseCompact } from '../selectors';
import {
  fetchStudentCourseIfNeeded,
  studentCourseFakeScore,
  studentCourseUnfakeScore,
  studentCourseFakeAssignment,
  studentCourseUnfakeAssignment,
  studentCourseScoreReset,
} from '../actions';

class Student extends React.PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    fetchIfNeeded: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isLoading: true,
  }

  componentDidMount() {
    const { fetchIfNeeded } = this.props;
    fetchIfNeeded();
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div>
        <LoadingLarge key="student-course" isLoading={isLoading}>
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

const mapStateToProps = (state, { match }) => studentCourseCompact(match.params.id)(state);
const mapDispatchToProps = (dispatch, { match }) => ({
  fetchIfNeeded: () => dispatch(fetchStudentCourseIfNeeded(match.params.id)),
  ...bindActionCreators({
    setFakeScore: studentCourseFakeScore,
    resetFakeScore: studentCourseUnfakeScore,
  }, dispatch),
  createFakeAssignment: (...args) => dispatch(studentCourseFakeAssignment(
    match.params.id, ...args,
  )),
  removeFakeAssignment: fakeId => dispatch(studentCourseUnfakeAssignment(
    match.params.id, fakeId,
  )),
  resetAllFakes: () => dispatch(studentCourseScoreReset(match.params.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Student));
