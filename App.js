import "react-native-gesture-handler";
import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { enableScreens } from "react-native-screens";
import Navigation from "./app/navigations";

enableScreens();

function App() {
  return (
    <SafeAreaView style={styles.app_view_container}>
      <StatusBar
        backgroundColor="#fff"
        barStyle={"dark-content"}
        animated={true}
        showHideTransition={"fade"}
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
