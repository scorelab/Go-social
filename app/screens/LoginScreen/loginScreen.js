import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TextInput, Button, AsyncStorage } from "react-native";

import styles from './style';

export default class LoginScreen extends Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../images/android-icon.png')}/>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Pasword"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        style={styles.input}
                    />
                </View>
                <Button title="Sign in!" onPress={this._signInAsync} />
            </View>

        );
    }

    _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'token_abc');
    this.props.navigation.navigate('App');
  };
}
