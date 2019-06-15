import React from 'react';
import { shallow } from 'enzyme';
import LegalInfo from '../LegalInfo';

it('renders title', () => {
  const wrapper = shallow(<LegalInfo />);
  expect(wrapper).toIncludeText('Descartes');
  expect(wrapper).toIncludeText('Terms of Use');
  expect(wrapper).toIncludeText('Privacy Policy');
});
