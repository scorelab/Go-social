import React, { Component } from "react";
import { AppRegistry, Dimensions, ActivityIndicator, AsyncStorage, View, StyleSheet, StatusBar } from "react-native";
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import Ionicons from "react-native-vector-icons/FontAwesome";

//Components
import HomeScreen from "./app/screens/HomeScreen/homeScreen";
import MapScreen from "./app/screens/MapScreen/mapScreen";
import ProfileScreen from "./app/screens/ProfileScreen/profileScreen";
import LoginScreen from "./app/screens/LoginScreen/loginScreen";
import ChatListScreen from "./app/screens/ChatListScreen/chatListScreen";
import SignupScreen from "./app/screens/SignupScreen/signupScreen";
import NotificationScreen from "./app/screens/NotificationScreen/notificationScreen";
import ForgotPasswordScreen from "./app/screens/ForgotPasswordScreen/forgotPasswordScreen";
import NewPostScreen from "./app/screens/NewPostScreen/NewPostScreen";
//Screen names
import { Home, Info, DetailView, Login } from "./app/screens/index";
//Screen size
var {height, width} = Dimensions.get("window");


class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    this.props.navigation.navigate(userToken ? "Auth" : "Auth");
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const AppStack = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Messages : { screen: ChatListScreen },
    Map : { screen: MapScreen },
    Notifications : { screen: NotificationScreen },
    Profile: { screen: ProfileScreen },  
    // NewPost:{ 
    //   screen:NewPostScreen,
    //   defaultNavigationOptions: {        
    //     tabBarVisible : false,
    //     header: null,
    //     headerLeft: null,
    //     headerRight: null,
    //   },
    //}      
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Messages') {
          iconName = 'comment';

        } else if (routeName === 'Map') {
          iconName = 'map';
        
        } else if (routeName === 'Notifications') {
          iconName = 'bell';
        
        } else if (routeName === 'Profile') {
          iconName = 'user';
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#3d9bf9',
      inactiveTintColor: 'gray',
    },
  }  
);

const AuthStack = createStackNavigator(
  {
      Login:{
          screen:LoginScreen
      },
      Signup:{
          screen:SignupScreen
      },
      ForgotPassword:{
        screen:ForgotPasswordScreen
      },
      NewPost:{ 
        screen:NewPostScreen
      },
      App:{
        screen:AppStack
      }        
  },{
      initialRouteName:"Login",        
      headerMode:"none"
  }
)

const AppContainer = createAppContainer(AuthStack);
export default AppContainer;
  
