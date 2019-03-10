import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TextInput, Button, AsyncStorage, BackHandler, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import Btn from 'react-native-micro-animated-button';
import styles from './style'
import * as EmailValidator from 'email-validator';

export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            Pasword: '',
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
                            onChangeText={(text) => this.setState({ Pasword: text })}
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
                <TouchableOpacity onPress={this.signInAsync} style={styles.loginButton} >
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


    signInAsync = async () => {
        if (EmailValidator.validate(this.state.email) === true) {
            if (this.state.Pasword === this.state.ConfirmPassword) {
                f.auth().createUserWithEmailAndPassword(this.state.email, this.state.Pasword).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                });

                await AsyncStorage.multiSet([['userToken', 'token_abc'], ['didIntroRun', 'YES']]);
                this.props.navigation.navigate('App');
            } else {
                alert("password Missmatch")
            }
        } else {
            alert("Please enter A Valid Email")
        }

    };
}
