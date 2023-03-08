import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen/loginScreen";
import SignupScreen from "../screens/SignupScreen/signupScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen/forgotPasswordScreen";
import NewPostScreen from "../screens/NewPostScreen/NewPostScreen";
import MessageScreen from "../screens/MessaginScreen/messaginScreen";
import AppNavigator from "./AppNavigation";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: false,
        headerShown: false,
        initialRouteName: "Login",
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="NewPost" component={NewPostScreen} />
      <Stack.Screen name="MessageView" component={MessageScreen} />
      <Stack.Screen name="App" component={AppNavigator} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
