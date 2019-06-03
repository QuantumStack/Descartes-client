import React from 'react';
import DataContainer from '../components/DataContainer';
import StudentCourse from '../components/StudentCourse';
import { STUDENT_URL } from '../util/api';

class Student extends React.Component {
  render() {
    return (
      <div>
        <div className='uk-container'>
          <DataContainer url={STUDENT_URL}>
            <StudentCourse />
          </DataContainer>
        </div>
      </div>
    );
  }
}

export default Student;
