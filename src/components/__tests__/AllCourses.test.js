import React from 'react';
import { shallow } from 'enzyme';
import AllCourses from '../AllCourses';

describe('AllCourses', () => {
  it('renders', () => {
    shallow(
      <AllCourses.WrappedComponent
        navbar={<div />}
        instructorCourses={[]}
        studentCourses={[]}
        historyPush={() => {}}
      />,
    );
  });
});
