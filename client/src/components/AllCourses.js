import React from 'react';
import PropTypes from 'prop-types';
import CourseList from './CourseList';
import Intro from './Intro';
import CreateButton from './CreateButton';
import JoinButton from './JoinButton';

class AllCourses extends React.PureComponent {
  static propTypes = {
    navbar: PropTypes.node.isRequired,
    instructorCourses: PropTypes.array.isRequired,
    studentCourses: PropTypes.array.isRequired,
  }

  render() {
    const { navbar, instructorCourses, studentCourses } = this.props;
    return instructorCourses.length > 0 || studentCourses.length > 0 ? (
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
    ) : <Intro navbar={navbar} />;
  }
}

export default AllCourses;
