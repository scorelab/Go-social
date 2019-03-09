import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TextInput, Button, AsyncStorage, BackHandler, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import Btn from 'react-native-micro-animated-button';

import styles from './style';

export default class LoginScreen extends Component {

    render(){
        return(
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="position">
                <View style={styles.logoContainer}>
                <Image
                    source={require('../../images/logo.png')}
                    style={styles.logo}
                />
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder="Email"
                        keyboardType = "email-address"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Pasword"
                        secureTextEntry={true}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        style={styles.input}
                    />
                </View>
                </KeyboardAvoidingView>
                <Btn
                    label="Sign In"
                    labelStyle={styles.buttonText}
                    onPress={this._signInAsync}
                    ref={ref => (this.btn = ref)}
                    successIcon="check"
                    scaleOnSuccess={true}
                    style={styles.loginButton}
                />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                <Text style={styles.text}>Forgot Password?</Text>
                </TouchableOpacity>

                <View style={styles.signUpTextArea}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Signup')}>
                    <Text style={styles.text}>Don't have an account?<Text style={{color:'#0066cc'}}> Sign Up</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'token_abc');
    this.props.navigation.navigate('App');
  };
}
