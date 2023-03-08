import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/FontAwesome";

import HomeScreen from "../screens/HomeScreen/homeScreen";
import ForumScreen from "../screens/ForumScreen/forumScreen";
import MapScreen from "../screens/MapScreen/mapScreen";
import ProfileScreen from "../screens/ProfileScreen/profileScreen";
import ChatListScreen from "../screens/ChatListScreen/chatListScreen";
import NotificationScreen from "../screens/NotificationScreen/notificationScreen";

const Tab = createBottomTabNavigator();

function TabIcon(focused, name) {
  return focused ? (
    <Ionicons name={name} size={25} color={"#3d9bf9"} />
  ) : (
    <Ionicons name={name} size={25} color={"gray"} />
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarLabelStyle: styles.tabBarLable,
        // tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ focused }) => TabIcon(focused, "home") }}
      />
      <Tab.Screen
        name="Forum"
        component={ForumScreen}
        options={{ tabBarIcon: ({ focused }) => TabIcon(focused, "inbox") }}
      />
      <Tab.Screen
        name="Messages"
        component={ChatListScreen}
        options={{ tabBarIcon: ({ focused }) => TabIcon(focused, "comment") }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ tabBarIcon: ({ focused }) => TabIcon(focused, "map") }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ tabBarIcon: ({ focused }) => TabIcon(focused, "bell") }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ focused }) => TabIcon(focused, "user") }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
