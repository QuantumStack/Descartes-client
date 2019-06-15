import React from 'react';
import { shallow } from 'enzyme';
import AccountSettings from '../AccountSettings';

describe('AccountSettings', () => {
  const editUserMock = jest.fn(() => { });
  const options = {
    navbar: <div />,
    isLoading: false,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@example.com',
    showEmail: true,
    oldPassword: '',
    password: '',
    password2: '',
    mismatch: false,
    strength: 0,
    payments: [],
    editUser: editUserMock,
    handleChange: () => {},
  };
  const wrapper = shallow(
    <AccountSettings {...options} />,
  );

  it('fills input values', () => {
    expect(wrapper.find('input[name="firstName"]')).toHaveValue(options.firstName);
    expect(wrapper.find('input[name="lastName"]')).toHaveValue(options.lastName);
    expect(wrapper.find('input[name="showEmail"]')).toBeChecked(options.showEmail);
    expect(wrapper.find('input[name="email"]')).toHaveValue(options.email);
    expect(wrapper.find('input[name="oldPassword"]')).toHaveValue('');
  });

  it('form submit triggers callback', () => {
    const form = wrapper.find('form');
    form.simulate('submit', {
      preventDefault: () => {},
    });
    expect(editUserMock.mock.calls.length).toBe(1);
  });
});
