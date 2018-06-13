import { React } from "react"
import { AppRegistry, Dimensions } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
//Components
import HomeScreen from './app/screens/HomeScreen/homeScreen';
import InfoScreen from './app/screens/InfoScreen/infoScreen';
import DetailScreen from './app/screens/DetailScreen/detailScreen';
import LoginScreen from './app/screens/LoginScreen/loginScreen';
//Screen names
import { Home, Info, DetailView, Login } from './app/screens/index';
//Screen size
var {height, width} = Dimensions.get('window');

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
export default StackNavigator(
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
        initialRouteName: "Login",
        headerMode: "none"
    }
)
  

 
    

