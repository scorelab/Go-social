import React from 'react';
import LoginScreen from '../app/screens/LoginScreen/loginScreen';

import renderer from 'react-test-renderer';

test('renders correctly',() => {
    const tree = renderer.create('<LoginScreen/>').toJSON();
    expect(tree).toMatchSnapshot();
})