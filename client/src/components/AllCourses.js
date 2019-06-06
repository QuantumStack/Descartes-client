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
    instructorCourses: PropTypes.arrayOf(PropTypes.object).isRequired,
    studentCourses: PropTypes.arrayOf(PropTypes.object).isRequired,
    history: RouterPropTypes.history.isRequired,
  }

  makeShortcuts() {
    const { history, instructorCourses, studentCourses } = this.props;
    const instructorShortcuts = instructorCourses.slice(0, 9).map(({ id, name }, i) => ({
      combos: (i + 1).toString(),
      callback: () => history.push(`/dashboard/instructor/${id}`),
      description: name,
    }));
    const studentShortcuts = studentCourses.slice(0, 9).map(({ id, name }, i) => ({
      combos: `alt+${i + 1}`,
      callback: () => history.push(`/dashboard/student/${id}`),
      description: name,
    }));
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
      ...instructorShortcuts,
      ...studentShortcuts,
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
            <CourseList id="instructor" title="I'm An Instructor" courses={instructorCourses}>
              <CreateButton />
            </CourseList>
            <CourseList id="student" title="Courses I'm Taking" courses={studentCourses}>
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
