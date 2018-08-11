import React, { Component } from "react"
import { AppRegistry, Dimensions, ActivityIndicator, AsyncStorage, View, StyleSheet, StatusBar } from 'react-native';
import { StackNavigator, DrawerNavigator, createStackNavigator, createSwitchNavigator, TabNavigator, TabBarBottom, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/FontAwesome';

//Components
import HomeScreen from './app/screens/HomeScreen/homeScreen';
import InfoScreen from './app/screens/InfoScreen/infoScreen';
import ProfileScreen from './app/screens/ProfileScreen/profileScreen';
import LoginScreen from './app/screens/LoginScreen/loginScreen';
import ChatListScreen from './app/screens/ChatListScreen/chatListScreen';
import SignupScreen from './app/screens/SignupScreen/signupScreen'
//Screen names
import { Home, Info, DetailView, Login } from './app/screens/index';
//Screen size
var {height, width} = Dimensions.get('window');

class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

let routeConfigs = {
    Home: {
        path: '/',
        screen: HomeScreen,
    },
    Info: {
        path: '/info',
        screen: InfoScreen,
    }
};
let drawerNavigatorConfig = {    
    initialRouteName: Home,
    drawerWidth: width / 2,
    drawerPosition: 'left'
};

const Drawer = DrawerNavigator(
    routeConfigs,
    drawerNavigatorConfig
)
const AuthStack = createStackNavigator(
    {
        Login:{
            screen:LoginScreen
        },
        Signup:{
            screen:SignupScreen
        }
    },{
        initialRouteName:"Login",
        headerMode:"none"
    }
)

const AppStack = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Messages : { screen: ChatListScreen },
    Camera : { screen: InfoScreen },
    Notifications : { screen: InfoScreen },
    Profile: { screen: ProfileScreen },

  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Messages') {
          iconName = 'comment';

        } else if (routeName === 'Camera') {
          iconName = 'camera';
        
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


export default createSwitchNavigator (
    {
        AuthLoading:AuthLoadingScreen,
        App: AppStack,
        Auth : AuthStack,
    },
    {
        initialRouteName:'AuthLoading'
    }
)
  
