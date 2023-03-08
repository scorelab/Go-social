import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigation';
import AuthNavigator from './AuthNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navigation = () => {
  const user = AsyncStorage.getItem('userToken');
  return (
    <NavigationContainer>
      {/* {user.userToken ? <AppNavigator /> : <AuthNavigator />} */}
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
