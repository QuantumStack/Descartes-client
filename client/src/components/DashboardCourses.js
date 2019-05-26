import React from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import CourseList from '../components/CourseList';
import LoadingLarge from './LoadingLarge';

class DashboardCourses extends React.Component {
  render() {
    const { instructorCourses, studentCourses, user } = this.props;
    return (
      <div key='dashboard-courses'>
        <UserNavbar name={user.name} />
        <CourseList id='instructor' title={'I\'m An Instructor'} courses={instructorCourses}>
          <Link to='/create' className='uk-button uk-button-secondary uk-button-small'>
            <span data-uk-icon='icon: file-edit; ratio: 0.7' className='uk-margin-small-right' />
            <span>Create</span>
          </Link>
        </CourseList>
        <CourseList id='student' title={'Courses I\'m Taking'} courses={studentCourses}>
          <Link to='/enroll' className='uk-button uk-button-secondary uk-button-small'>
            <span data-uk-icon='icon: plus; ratio: 0.7' className='uk-margin-small-right' />
            <span>Enroll</span>
          </Link>
        </CourseList>
        <br />
      </div>
    );
  }
}

export default DashboardCourses;
