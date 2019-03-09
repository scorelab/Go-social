import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TextInput, Button, AsyncStorage, BackHandler, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import Btn from 'react-native-micro-animated-button';
import * as EmailValidator from 'email-validator';
import styles from './style';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            Pasword:'',                      
        }
    };
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
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                    <TextInput
                        placeholder="Pasword"
                        secureTextEntry={true}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        style={styles.input}
                        onChangeText={(text) => this.setState({ Pasword: text })}
                    />
                </View>
                </KeyboardAvoidingView>
                
                <TouchableOpacity onPress={this._signInAsync} style={styles.loginButton} >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                <Text style={styles.text}>Forgot Password?</Text>
                </TouchableOpacity>

                <View style={styles.signUpTextArea}>
                <Btn
                    label="Login with Facebook"
                    labelStyle={styles.buttonTextFacebookButton}
                    onPress={this._signInAsync}
                    ref={ref => (this.btn = ref)}
                    successIcon="check"
                    scaleOnSuccess={true}
                    style={styles.loginButtonFacebook}
                />
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Signup')}>
                    <Text style={styles.text}>Don't have an account?<Text style={{color:'#0066cc'}}> Sign Up</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _signInAsync = async () => {
        if (EmailValidator.validate(this.state.email) === true) {
            if(this.state.Pasword != ""){
                await AsyncStorage.setItem('userToken', 'token_abc');
                this.props.navigation.navigate('App');
            }else{
                alert("Enter the password")
            }
        } else {
            alert("Please enter A Valid Email")
        }
    
  };

}
