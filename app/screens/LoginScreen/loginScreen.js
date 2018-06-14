import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TextInput, Button, AsyncStorage } from "react-native";

export default class LoginScreen extends Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../images/android-icon.png')}/>
                    <Text>Login Screen</Text>
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

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#03A9F4'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width:100,
        height:100,

    },
    formContainer: {
        padding:20
    },
    input:{
        height:40,
        backgroundColor:'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10
    }
});