import React from 'react';
import loginScreen from '../app/screens/LoginScreen/loginScreen';

import renderer from 'react-test-renderer';

describe('those tests', () => {
    test('will fail', () => {
      expect({ a: 5 }).toMatchSnapshot({
        a: 5
      }, 'snaphot 1');
    });
  
    test('will also fail', () => {
      expect({ a: 4 }).toMatchSnapshot({
        a: 4
      }, 'snapshot 2');
    });
  });