import { AppRegistry, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
// import App from './App';
//Components
import HomeScreen from './app/screens/HomeScreen/homeScreen';
import InfoScreen from './app/screens/Info/infoScreen';
//Screen names
import { Home, Info,} from './app/screens/index';
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
    drawerPosition: 'left',
    // drawerOpenRoute: 'DrawerOpen',
    // drawerCloseRoute: 'DrawerClose',
    // drawerToggleRoute: 'DrawerToggle',  
    // // drawerBackgroundColor: 'orange',
    // contentOptions: {
    //     activeTintColor: 'red',
    // },
    // order: [Info, Settings, Cloud, Home]
};

export default DrawerNavigator ({
  Home: {
    path: '/',
    screen: HomeScreen,
},
Info: {
    path: '/info',
    screen: InfoScreen,
}},{
initialRouteName: Home,
drawerWidth: width / 2,
drawerPosition: 'left',
})

// import React, { Component } from "react";
// import { StyleSheet, Image, Button } from "react-native";
// import { DrawerNavigator } from "react-navigation";

// class MyHomeScreen extends Component {
//   static navigationOptions = {
//     drawerLabel: 'Home',
//     drawerIcon: ({ tintColor }) => (
//       <Image
//         source={require('./app/icons/home-icon.png')}
//         style={[styles.icon, {tintColor: tintColor}]}
//       />
//     ),
//   };

//   render() {
//     return (
//       <Button
//         onPress={() => this.props.navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     );
//   }
// }

// class MyNotificationsScreen extends React.Component {
//   static navigationOptions = {
//     drawerLabel: 'Notifications',
//     drawerIcon: ({ tintColor }) => (
//       <Image
//         source={require('./app/icons/info-icon.png')}
//         style={[styles.icon, {tintColor: tintColor}]}
//       />
//     ),
//   };

//   render() {
//     return (
//       <Button
//         onPress={() => this.props.navigation.goBack()}
//         title="Go back home"
//       />
//     );
//   }
// }

// const styles = StyleSheet.create({
//   icon: {
//     width: 24,
//     height: 24,
//   },
// });

// export default DrawerNavigator({
//   Home: {
//     screen: MyHomeScreen,
//   },
//   Notifications: {
//     screen: MyNotificationsScreen,
//   }
// },
// {
//   drawerPosition:"left",
//   drawerWidth:200,
//   initialRouteName: "Home"
// }
// )




// // /**
// //  * Sample React Native App
// //  * https://github.com/facebook/react-native
// //  * @flow
// //  */

// // import React, { Component } from 'react';
// // import {
// //   Platform,
// //   StyleSheet,
// //   Text,
// //   View
// // } from 'react-native';

// // type Props = {};
// // export default class App extends Component<Props> {
// //   render() {
// //     return (
// //       <View style={styles.container}>
// //         <Text style={styles.welcome}>
// //           Welcome to Go Social!
// //         </Text>
// //         <Text style={styles.instructions}>
// //           Just Initialized
// //         </Text>

// //       </View>
// //     );
// //   }
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#F5FCFF',
// //   },
// //   welcome: {
// //     fontSize: 20,
// //     textAlign: 'center',
// //     margin: 10,
// //   },
// //   instructions: {
// //     textAlign: 'center',
// //     color: '#333333',
// //     marginBottom: 5,
// //   },
// // });
