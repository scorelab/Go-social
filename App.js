// /* eslint-disable prettier/prettier */
// //     "react-native-micro-animated-button": "^0.0.24",

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   Dimensions,
//   ActivityIndicator,
//   View,
//   StyleSheet,
//   StatusBar,
//   Text,
// } from 'react-native';
// // import {
// //   createStackNavigator,
// //   createSwitchNavigator,
// //   createBottomTabNavigator,
// //   createAppContainer,
// // } from 'react-navigation';
// import Ionicons from 'react-native-vector-icons/FontAwesome';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// //Components
// import HomeScreen from './app/screens/HomeScreen/homeScreen';
// import ForumScreen from './app/screens/ForumScreen/forumScreen';
// import MapScreen from './app/screens/MapScreen/mapScreen';
// import ProfileScreen from './app/screens/ProfileScreen/profileScreen';
// import ChatListScreen from './app/screens/ChatListScreen/chatListScreen';
// import NotificationScreen from './app/screens/NotificationScreen/notificationScreen';
// import LoginScreen from './app/screens/LoginScreen/loginScreen';
// import SignupScreen from './app/screens/SignupScreen/signupScreen';
// import ForgotPasswordScreen from './app/screens/ForgotPasswordScreen/forgotPasswordScreen';
// import NewPostScreen from './app/screens/NewPostScreen/NewPostScreen';
// import MessageScreen from './app/screens/MessaginScreen/messaginScreen';
// //Screen names
// import { Home, Info, DetailView, Login } from './app/screens/index';
// //Screen size
// var { height, width } = Dimensions.get('window');

// class AuthLoadingScreen extends Component {
//   constructor() {
//     super();
//     this._bootstrapAsync();
//   }

//   _bootstrapAsync = async () => {
//     const userToken = await AsyncStorage.getItem('userToken');

//     this.props.navigation.navigate(userToken ? 'Auth' : 'Auth');
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator />
//       </View>
//     );
//   }
// }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });

// // const AppStack = createBottomTabNavigator(
// //   {
// //     Home: { screen: HomeScreen },
// //     Forum: { screen: ForumScreen },
// //     Messages: { screen: ChatListScreen },
// //     Map: { screen: MapScreen },
// //     Notifications: { screen: NotificationScreen },
// //     Profile: { screen: ProfileScreen },
// //   },
// //   {
// //     defaultNavigationOptions: ({ navigation }) => ({
// //       tabBarIcon: ({ focused, tintColor }) => {
// //         const { routeName } = navigation.state;
// //         let iconName;
// //         if (routeName === 'Home') {
// //           iconName = 'home';
// //         } else if (routeName === 'Forum') {
// //           iconName = 'chatbox-outline';
// //         } else if (routeName === 'Messages') {
// //           iconName = 'comment';
// //         } else if (routeName === 'Map') {
// //           iconName = 'map';
// //         } else if (routeName === 'Notifications') {
// //           iconName = 'bell';
// //         } else if (routeName === 'Profile') {
// //           iconName = 'user';
// //         }

// //         return <Ionicons name={iconName} size={25} color={tintColor} />;
// //       },
// //     }),
// //     tabBarOptions: {
// //       activeTintColor: '#3d9bf9',
// //       inactiveTintColor: 'gray',
// //     },
// //   }
// // );

// // const AuthStack = createStackNavigator(
// //   {
// //     Login: {
// //       screen: LoginScreen,
// //     },
// //     Signup: {
// //       screen: SignupScreen,
// //     },
// //     ForgotPassword: {
// //       screen: ForgotPasswordScreen,
// //     },
// //     NewPost: {
// //       screen: NewPostScreen,
// //     },
// //     MessageView: {
// //       screen: MessageScreen,
// //     },
// //     App: {
// //       screen: AppStack,
// //     },
// //   },
// //   {
// //     initialRouteName: 'Login',
// //     mode: 'modal',
// //     headerMode: 'none',
// //   }
// // );

// // const AppContainer = createAppContainer(AuthStack);
// const App = () => {
//   return <Text>Hello world</Text>;
// };

// // export default AppContainer;
// export default App;

import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import Navigation from './app/navigations';

enableScreens();

function App() {
  return (
    <SafeAreaView style={styles.app_view_container}>
      <StatusBar
        backgroundColor="#fff"
        barStyle={'dark-content'}
        animated={true}
        showHideTransition={'fade'}
      />
      <Navigation />
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  app_view_container: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
  },
});
