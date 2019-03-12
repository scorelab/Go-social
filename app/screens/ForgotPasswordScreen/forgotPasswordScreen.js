import React, { Component } from "react";
import { Platform, StyleSheet, View, Text, Image, TextInput, Button, AsyncStorage, BackHandler, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import Btn from 'react-native-micro-animated-button';
import * as EmailValidator from 'email-validator';
import styles from './style';
import { f, auth } from "../../../config/config.js";
export default class ForgotPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''            
        }
    };
    render() {
        return (
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
                            keyboardType="email-address"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            style={styles.input}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                    </View>
                </KeyboardAvoidingView>
                <TouchableOpacity onPress={this.resetPassword} style={styles.loginButton} >
                    <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.text}>Go Back To Login</Text>
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text style={styles.text}>Don't have an account?<Text style={{ color: '#0066cc' }}> Sign Up</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    resetPassword = () => {
        // alert(this.state.email);
        if (EmailValidator.validate(this.state.email) === true) {
            f.auth().sendPasswordResetEmail(this.state.email).then(function() {
                alert("Please Check Your Email To Reset Your Password")
              }).catch(function(error) {
                alert(error)
              });
              
        } else {
            alert("Please enter A Valid Email")
        }
    };
}
