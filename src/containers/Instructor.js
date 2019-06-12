import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoadingLarge from '../components/LoadingLarge';
import UserContainer from './UserContainer';
import { instructorCourseCompact } from '../selectors';
import { fetchInstructorCourseIfNeeded } from '../actions';

class Instructor extends React.PureComponent {
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
              <div>Coming soon</div>
            </UserContainer>
          </div>
        </LoadingLarge>
      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => instructorCourseCompact(match.params.id)(state);
const mapDispatchToProps = (dispatch, { match }) => ({
  fetchIfNeeded: () => dispatch(fetchInstructorCourseIfNeeded(match.params.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Instructor));
