import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TextInput, Button, AsyncStorage, BackHandler, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import { LoginButton, AccessToken, LoginManager } from "react-native-fbsdk";
import { f, auth } from "../../../config/config.js";
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
  componentDidMount() {
    this.fireBaseListner = f.auth().onAuthStateChanged(auth => {
      if (auth) {
        this.firebaseRef = f.database().ref(users);
        this.firebaseRef.child(auth.uid).on("value", snap => {
          const user = snap.val();
          if (user != null) {
            this.firebaseRef.child(auth.id).off("value");
            this.redirectUser(user);
          }
        });
      }
    });
  }


  redirectUser(user) {
    this.props.navigate("App");
  }

  onPressLogin() {
    LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
      result => this._handleCallBack(result),
      function(error) {
        alert("Login fail with error: " + error);
      }
    );
  }

  _handleCallBack(result) {
    let _this = this;
    if (result.isCancelled) {
      alert("Login cancelled");
    } else {
      AccessToken.getCurrentAccessToken().then(data => {
        const token = data.accessToken;
        fetch(
          "https://graph.facebook.com/v2.8/me?fields=id,first_name,last_name,gender,birthday&access_token=" +
            token
        )
          .then(response => response.json())
          .then(json => {
            const imageSize = 120;
            const facebookID = json.id;
            const fbImage = `https://graph.facebook.com/${facebookID}/picture?height=${imageSize}`;
            this.authenticate(data.accessToken).then(function(result) {
              const { uid } = result;
              _this.createUser(uid, json, token, fbImage);
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      });
    }
  }

  authenticate = token => {
    const provider = auth.FacebookAuthProvider;
    const credential = provider.credential(token);
    let ret = f.auth().signInWithCredential(credential);
    return ret;
  };
  createUser = (uid, userData, token, dp) => {
    const defaults = {
      uid,
      token,
      dp,
      ageRange: [20, 30]
    };
    f.database()
      .ref("users")
      .child(uid)
      .update({ ...userData, ...defaults });
  }; 

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
    }
 
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.logoContainer}>
            <Image
              source={require("../../images/logo.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
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
        <TouchableOpacity onPress={this._signInAsync} style={styles.loginButton} >
                    <Text style={styles.buttonText}>Sign In</Text>
         </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.text}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button
          onPress={this.onPressLogin.bind(this)}
          title="Login with facebook"
          color="#841584"
        />
        <View style={styles.signUpTextArea}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Signup")} >
            <Text style={styles.text}>
              Don't have an account?
              <Text style={{ color: "#0066cc" }}> Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}
