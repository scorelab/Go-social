import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigation";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={BottomTabNavigator} />
      <Stack.Screen name="ForumScreen" component={BottomTabNavigator} />
      <Stack.Screen name="MessagesScreen" component={BottomTabNavigator} />
      <Stack.Screen name="MapScreen" component={BottomTabNavigator} />
      <Stack.Screen name="NotificationsScreen" component={BottomTabNavigator} />
      <Stack.Screen name="ProfileScreen" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
