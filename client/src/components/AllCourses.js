import React from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import CourseList from './CourseList';

class AllCourses extends React.Component {
  render() {
    const { instructorCourses, studentCourses, user } = this.props;
    return (
      <div>
        <UserNavbar name={user.name} />
        <CourseList id='instructor' title={'I\'m An Instructor'} courses={instructorCourses}>
          <Link to='/create' className='uk-button uk-button-secondary uk-button-small'>
            <span data-uk-icon='icon: file-edit; ratio: 0.7' className='uk-margin-small-right' />
            <span>Create</span>
          </Link>
        </CourseList>
        <CourseList id='student' title={'Courses I\'m Taking'} courses={studentCourses}>
          <Link to='/join' className='uk-button uk-button-secondary uk-button-small'>
            <span data-uk-icon='icon: plus; ratio: 0.7' className='uk-margin-small-right' />
            <span>Join</span>
          </Link>
        </CourseList>
        <br />
      </div>
    );
  }
}

export default AllCourses;
