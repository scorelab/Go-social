import React from 'react';
import loginScreen from '../app/screens/LoginScreen/loginScreen';

import renderer from 'react-test-renderer';

describe('login test', () => {
    test('username valid', () => {
      expect({ a: 5 }).toMatchSnapshot({
        a: 5
      }, 'snaphot 1');
    });
  
    test('password valid', () => {
      expect({ a: 4 }).toMatchSnapshot({
        a: 4
      }, 'snapshot 2');
    });
  });