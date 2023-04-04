//done
import React, { Component } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  BackHandler,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
// import Btn from 'react-native-micro-animated-button';
import * as EmailValidator from "email-validator";
import styles from "./style";
import { firebaseApp, auth } from "../../../config/config.js";
import {sendPasswordResetEmail} from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  render() {
    return (
      <View style={styles.firstContainer}>
        <ScrollView style={styles.scrollStyle}>
          <View style={styles.container}>
            <KeyboardAvoidingView behavior="position">
              <View style={styles.logoContainer}>
                <Image source={require("../../images/logo.png")} style={styles.logo} />
              </View>
              <View style={styles.formContainer}>
                <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  style={styles.input}
                  onChangeText={text => this.setState({ email: text })}
                />
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={this.resetPassword} style={styles.loginButton}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.text}>Go Back To Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  resetPassword = () => {
    if (EmailValidator.validate(this.state.email) === true) {
      var that = this;
      sendPasswordResetEmail(auth,this.state.email)
        .then(function () {
          Alert("Please Check Your Email To Reset Your Password");
          let { navigate } = that.props.navigation;
          navigate("Login");
        })
        .catch(function (error) {
          Alert(error);
        });
    } else {
      Alert("Please enter A Valid Email");
    }
  };
}
