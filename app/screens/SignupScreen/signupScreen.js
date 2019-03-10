import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TextInput, Button, AsyncStorage, BackHandler, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import Btn from 'react-native-micro-animated-button';
import styles from './style'
import * as EmailValidator from 'email-validator';
import { f, auth } from "../../../config/config.js";
export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            Password: '',
            ConfirmPassword: ''
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
                            placeholder="Name"                            
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            style={styles.input}
                            onChangeText={(text) => this.setState({ name: text })}
                        />
                        <TextInput
                            placeholder="Email"
                            keyboardType="email-address"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            style={styles.input}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                        <TextInput
                            placeholder="Pasword"
                            secureTextEntry={true}
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            style={styles.input}
                            onChangeText={(text) => this.setState({ Password: text })}
                        />
                        <TextInput
                            placeholder="Confirm Pasword"
                            secureTextEntry={true}
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            style={styles.input}
                            onChangeText={(text) => this.setState({ ConfirmPassword: text })}
                        />
                    </View>
                </KeyboardAvoidingView>
                <TouchableOpacity onPress={this.signUpAsync} style={styles.loginButton} >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.signInTextArea}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.text}>Already have an account?<Text style={{ color: '#0066cc' }}> Sign In</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
    register() {
        
        let email = this.state.email;  
        let name = this.state.name;        
        let password = this.state.Password;

        const { navigate } = this.props.navigation;

        f.auth().createUserWithEmailAndPassword(email, password)
            .then(function (data) {
                data.user.updateProfile({
                    displayName: name                    
                }).then(
                    function () {
                        console.log("Updated User Data..");
                    },
                    function (error) {
                        console.log("Error Updating User Data.." + error);
                    }
                );            
                alert("Welcome to Go Social!");                
                navigate('App');
            }).catch(function (error) {
                var errorMessage = error.message;
                console.log("Error = " + errorMessage);
                alert(errorMessage);
            });
    }

    signUpAsync = async () => {
        if (EmailValidator.validate(this.state.email) === true) {
            if (this.state.Password === this.state.ConfirmPassword) {
                this.register();                
            } else {
                alert("password Missmatch")
            }
        } else {
            alert("Please enter A Valid Email")
        }

    };
}
