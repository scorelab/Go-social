import React, { Component } from "react"
import { AppRegistry, Dimensions, ActivityIndicator, AsyncStorage, View, StyleSheet, StatusBar } from 'react-native';
import { StackNavigator, DrawerNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
//Components
import HomeScreen from './app/screens/HomeScreen/homeScreen';
import InfoScreen from './app/screens/InfoScreen/infoScreen';
import DetailScreen from './app/screens/DetailScreen/detailScreen';
import LoginScreen from './app/screens/LoginScreen/loginScreen';
//Screen names
import { Home, Info, DetailView, Login } from './app/screens/index';
//Screen size
var {height, width} = Dimensions.get('window');

class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
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
        }
    },{
        initialRouteName:"Login",
        headerMode:"none"
    }
)
const AppStack = createStackNavigator(
    {
      Drawer: {
          screen:Drawer
      },
      Home: {
        path: '/',
        screen: HomeScreen,
      },
      Info: {
        path: '/info',
        screen: InfoScreen,
      },
      DetailView:{
        screen: DetailScreen
      },
      Login:{
          screen:LoginScreen
      }

    },
    {
        initialRouteName: "Drawer",
        headerMode: "none"
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
  
