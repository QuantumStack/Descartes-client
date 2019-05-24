import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import UserNavbar from '../components/UserNavbar';
import CourseList from '../components/CourseList';
import PaymentContainer from '../components/PaymentContainer';
import CreateForm from '../components/CreateForm';
import Modal from '../components/Modal';
import { ax, authHeader, USER_INFO_URL } from '../util/api';
import { deauthenticate } from '../util/auth';
import { error } from  '../util/alert';
import { modal } from 'uikit';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructorCourses: [
        {
          id: '1',
          role: 'instructor',
          name: '15-122: Fall 2019',
          instructors: 10,
          students: 500,
          activities: 5,
          polls: 10,
          expired: false
        }
      ],
      studentCourses: [
        {
          id: '1',
          name: '15-150: Fall 2019',
          head: 'Karl Crary',
          activities: 1,
          polls: 5,
          oh: true,
        },
        {
          id: '2',
          name: '73-102: Spring 2019',
          head: 'James Best',
          activities: 1,
          polls: 34328,
          expired: true,
        },
        {
          id: '3',
          name: '21-127: Summer 2019',
          head: 'Mary Radcliffe',
          activities: 3,
          polls: 0,
        },
      ],
      user: {},
    };
  }

  componentDidMount() {
    ax.get(USER_INFO_URL, { headers: authHeader() })
    .then(({ data }) => this.setState(data))
    .catch(({ response: res = {} }) => {
      if (res.status === 401) {
        deauthenticate();
        this.props.history.push('/login');
      } else {
        // TODO: uncomment error msg
        // error(res.statusText);
      }
    });
  }
  
  render() {
    const { studentCourses, instructorCourses} = this.state;
    return <div>
      <Helmet>
        <title>Dashboard | Descartes</title>
      </Helmet>
      <div className='uk-container'>
        <UserNavbar name='Ashwin' />
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
    </div>;
  }
}

export default withRouter(Dashboard);
