import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import { fetchDashboardIfNeeded } from '../actions';
import { instructorCoursesAsArray, studentCoursesAsArray } from '../selectors';
import LoadingLarge from '../components/LoadingLarge';
import UserContainer from './UserContainer';
import AllCourses from '../components/AllCourses';

class Dashboard extends React.PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    fetchIfNeeded: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { fetchIfNeeded } = this.props;
    fetchIfNeeded();
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div>
        <Helmet>
          <title>Dashboard | Descartes</title>
        </Helmet>
        <LoadingLarge key="dashboard" isLoading={isLoading}>
          <UserContainer>
            <AllCourses {...this.props} />
          </UserContainer>
        </LoadingLarge>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.dashboard,
  instructorCourses: instructorCoursesAsArray(state),
  studentCourses: studentCoursesAsArray(state),
});
const mapDispatchToProps = dispatch => bindActionCreators({
  historyPush: push,
  fetchIfNeeded: fetchDashboardIfNeeded,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
