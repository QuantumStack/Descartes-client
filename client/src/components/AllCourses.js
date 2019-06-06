import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RouterPropTypes from 'react-router-prop-types';
import CourseList from './CourseList';
import Intro from './Intro';
import CreateButton from './CreateButton';
import JoinButton from './JoinButton';
import KeyShortcuts from './KeyShortcuts';

class AllCourses extends React.PureComponent {
  static propTypes = {
    navbar: PropTypes.node.isRequired,
    instructorCourses: PropTypes.array.isRequired,
    studentCourses: PropTypes.array.isRequired,
    history: RouterPropTypes.history.isRequired,
  }

  makeShortcuts() {
    const { history } = this.props;
    return [
      {
        combos: ['n', 'c'],
        callback: () => history.push('/create'),
        description: 'Create a course',
      },
      {
        combos: ['j', 'N'],
        callback: () => history.push('/join'),
        description: 'Join a course',
      },
      {
        combos: ',',
        callback: () => history.push('/dashboard/account'),
        description: 'Go to account settings',
      },
    ];
  }

  render() {
    const { navbar, instructorCourses, studentCourses } = this.props;
    return (
      <div>
        <KeyShortcuts name="all-courses" shortcuts={this.makeShortcuts()} />
        {instructorCourses.length > 0 || studentCourses.length > 0 ? (
          <div className="uk-container">
            {navbar}
            <CourseList id="instructor" title={'I\'m An Instructor'} courses={instructorCourses}>
              <CreateButton />
            </CourseList>
            <CourseList id="student" title={'Courses I\'m Taking'} courses={studentCourses}>
              <JoinButton />
            </CourseList>
            <br />
          </div>
        ) : <Intro navbar={navbar} />}
      </div>
    );
  }
}

export default withRouter(AllCourses);
