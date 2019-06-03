import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CourseList from './CourseList';

class AllCourses extends React.PureComponent {
  static propTypes = {
    navbar: PropTypes.node.isRequired,
    instructorCourses: PropTypes.array.isRequired,
    studentCourses: PropTypes.array.isRequired,
  }

  render() {
    const { navbar, instructorCourses, studentCourses } = this.props;
    return (
      <div>
        {navbar}
        <CourseList id="instructor" title={'I\'m An Instructor'} courses={instructorCourses}>
          <Link to="/create" className="uk-button uk-button-secondary uk-button-small">
            <span data-uk-icon="icon: file-edit; ratio: 0.7" className="uk-margin-small-right" />
            <span>Create</span>
          </Link>
        </CourseList>
        <CourseList id="student" title={'Courses I\'m Taking'} courses={studentCourses}>
          <Link to="/join" className="uk-button uk-button-secondary uk-button-small">
            <span data-uk-icon="icon: plus; ratio: 0.7" className="uk-margin-small-right" />
            <span>Join</span>
          </Link>
        </CourseList>
        <br />
      </div>
    );
  }
}

export default AllCourses;
