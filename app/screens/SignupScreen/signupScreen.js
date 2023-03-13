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
import styles from "./style";
import * as EmailValidator from "email-validator";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { app, auth, db } from "../../../config/config.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithCredential,
  FacebookAuthProvider,
} from "firebase/auth";
import { ref, set, orderByChild, equalTo, once } from "firebase/database";
import { SocialIcon } from "react-native-elements";

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
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

  // Validate user input for sign up
  async _signUpAsync() {
    if (this.state.name == "") {
      alert("Please enter your name!");
    } else if (!EmailValidator.validate(this.state.email)) {
      alert("Please enter a valid email!");
    } else if (this.state.password == "") {
      alert("Please enter a password!");
    } else if (this.state.password != this.state.confirmPassword) {
      alert("Password and Confirm password must be same");
    } else {
      this.signup();
    }
  }

  // Sign up with email and password
  async signup() {
    try {
      let name = this.state.name;
      let email = this.state.email;
      let password = this.state.password;

      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
    } catch (error) {
      alert(error.message.toString());
    }
  }

  // Signup user with facebook account
  async _fbSignUpAsync() {
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
                <Image source={require("../../images/logo.png")} style={styles.logo} />
              </View>
              <View style={styles.formContainer}>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  style={styles.input}
                  onChangeText={text => this.handleInput("name", text)}
                />
                <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  style={styles.input}
                  onChangeText={text => this.handleInput("email", text)}
                />
                <TextInput
                  placeholder="Pasword"
                  secureTextEntry={true}
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  style={styles.input}
                  onChangeText={text => this.handleInput("password", text)}
                />
                <TextInput
                  placeholder="Confirm Pasword"
                  secureTextEntry={true}
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  style={styles.input}
                  onChangeText={text => this.handleInput("confirmPassword", text)}
                />
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={this._signUpAsync.bind(this)} style={styles.loginButton}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.text}>or</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this._fbSignUpAsync.bind(this)}>
              <SocialIcon
                style={{ width: 290 }}
                title="Sign Up With Facebook"
                button
                type="facebook"
              />
            </TouchableOpacity>

            <View style={styles.signInTextArea}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.text}>
                  Already have an account?
                  <Text style={{ color: "#0066cc" }}> Sign In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
