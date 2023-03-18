import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { app, auth, db } from "../../../config/config.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCredential,
  FacebookAuthProvider,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import * as EmailValidator from "email-validator";
import { SocialIcon } from "react-native-elements";
import styles from "./style";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    var that = this;
    onAuthStateChanged(auth, function (user) {
      if (user) {
        that.redirectUser();
      }
    });
  }

  redirectUser() {
    const { navigate } = this.props.navigation;
    navigate("App");
  }

  // Validate the user's email and password
  async _signInAsync() {
    if (!EmailValidator.validate(this.state.email)) {
      alert("Please enter a valid email!");
    } else if (this.state.password == "") {
      alert("Enter your password!");
    } else {
      this.login();
    }
  }

  // Signin with email and password
  async login() {
    try {
      let email = this.state.email;
      let password = this.state.password;

      const res = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message.toString());
    }
  }

  // Signin user with facebook account
  async _fbSignInAsync() {
    try {
      const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
      if (!result.isCancelled) {
        // Get the user's access token
        const data = await AccessToken.getCurrentAccessToken();

        // Use the user's access token to authenticate with Firebase Authentication
        const credential = FacebookAuthProvider.credential(data.accessToken);
        const { user } = await signInWithCredential(auth, credential);

        const response = await fetch(
          `https://graph.facebook.com/v2.8/me?fields=id,first_name,last_name,email,birthday&access_token=${data.accessToken}`
        );
        const userData = await response.json();
        const photoURL = `https://graph.facebook.com/${userData.id}/picture?height=120`;
        this.createUser(user.uid, userData, data.accessToken, photoURL);
      }
    } catch (error) {
      alert(error.message.toString());
    }
  }

  // Create user
  async createUser(uid, userData, token, photoURL) {
    try {
      const defaults = { uid, token, photoURL, Range: [20, 30] };
      const usersRef = ref(db, "users/" + uid);
      set(usersRef, { ...userData, ...defaults });
    } catch (error) {
      alert(error.message.toString());
    }
  }

  handleInput(input, text) {
    this.setState(prevState => ({ ...prevState, [input]: text }));
  }

  render() {
    return (
      <View style={styles.firstContainer}>
        <ScrollView style={styles.scrollStyle}>
          <View style={styles.container}>
            <KeyboardAvoidingView behavior="position">
              <View style={styles.logoContainer}>
                <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
              </View>
              <View style={styles.formContainer}>
                <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  style={styles.input}
                  onChangeText={text => this.handleInput("email", text)}
                  ref={input => {
                    this.textInput = input;
                  }}
                />
                <TextInput
                  placeholder="Pasword"
                  secureTextEntry={true}
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  style={styles.input}
                  onChangeText={text => this.handleInput("password", text)}
                  ref={input => {
                    this.textInput = input;
                  }}
                />
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={this._signInAsync.bind(this)} style={styles.loginButton}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate("ForgotPassword")}>
              <Text style={styles.text}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this._fbSignInAsync.bind(this)}>
              <SocialIcon
                style={{ width: 290 }}
                title="Sign In With Facebook"
                button
                type="facebook"
              />
            </TouchableOpacity>

            <View style={styles.signUpTextArea}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Signup")}>
                <Text style={styles.text}>
                  Don't have an account?
                  <Text style={{ color: "#0066cc" }}> Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              onPress={() => this.props.navigation.navigate("App")}
              title="Skip Login "
              color="#000"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
