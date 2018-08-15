import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TextInput, Button, AsyncStorage, BackHandler, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import Btn from 'react-native-micro-animated-button';
import styles from './style'

export default class SignUpScreen extends Component {

    render(){
        return(
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="position">
                <View style={styles.logoContainer}>
                <Image
                    source={require('../../images/android-icon.png')}
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
                    <TextInput
                        placeholder="Confirm Pasword"
                        secureTextEntry={true}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        style={styles.input}
                    />
                </View>
                </KeyboardAvoidingView>
                <Btn
                    label="Sign Up"
                    labelStyle={styles.buttonText}
                    onPress={this.signInAsync}
                    ref={ref => (this.btn = ref)}
                    successIcon="check"
                    scaleOnSuccess={true}
                    style={styles.loginButton}
                />
                <View style={styles.signInTextArea}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                    <Text style={styles.text}>Already have an account?<Text style={{color:'#0066cc'}}> Sign In</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }

    signInAsync = async () => {
        this.btn.success();
        await AsyncStorage.multiSet([['userToken', 'token_abc'], ['didIntroRun', 'YES']]);
        this.props.navigation.navigate('App');
    };
}
