import React from 'react';
import SignUp from '../app/screens/SignupScreen/signupScreen';

import renderer from 'react-test-renderer';

jest.useFakeTimers();

test('renders correctly', () => {
  const tree = renderer.create(<SignUp />).toJSON();
  expect(tree).toMatchSnapshot();
});