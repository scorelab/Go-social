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
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { auth, db } from "../../../config/config.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithCredential,
  FacebookAuthProvider,
} from "firebase/auth";
import { SocialIcon } from "react-native-elements";

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  componentDidMount() {
    const that = this;
    onAuthStateChanged(auth, function (user) {
      if (user) {
        that.props.navigation.navigate("App");
      }
    });
  }

  async onSignup() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      );

      // const user = userCredential.user;
      // await updateProfile(user, { displayName: this.state.name });
      console.log("User signed up successfully");
    } catch (error) {
      console.log(error);
      alert(error.message.toString());
    }
  }

  async _signUpAsync() {
    if (this.state.name == "") {
      alert("Please enter your name");
    } else if (EmailValidator.validate(this.state.email) === true) {
      if (this.state.password != "" && this.state.password === this.state.confirmPassword) {
        this.onSignup();
      } else if (this.state.password != "") {
        alert("Enter the password");
      } else {
        alert("password and Confirm password must be the same");
      }
    } else {
      alert("Please enter A Valid Email");
    }
  }

  async onFbSignup() {
    try {
      const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);

      if (result.isCancelled) {
        throw new Error("User cancelled the signup process");
      }

      // You can get the user's access token using the following code:
      const data = await AccessToken.getCurrentAccessToken();

      // You can use the user's access token to authenticate with Firebase Authentication:
      const credential = FacebookAuthProvider.credential(data.accessToken);
      const response = await fetch(
        `https://graph.facebook.com/v2.8/me?fields=id,first_name,last_name,gender,birthday&access_token=${data.accessToken}`
      );
      const userData = await response.json();
      const { uid } = await signInWithCredential(auth, credential);

      // Fetch fb image from facebook
      const imageSize = 120;
      const facebookID = userData.id;
      const fbImage = `https://graph.facebook.com/${facebookID}/picture?height=${imageSize}`;

      // create new user using facebook credentials
      this.createUser(uid, userData, data.AccessToken, fbImage);
    } catch (error) {
      console.log(error);
    }
  }

  createUser(uid, userData, token, dp) {
    const defaults = { uid, token, dp, ageRange: [20, 30] };
    db.ref("users")
      .child(uid)
      .update({ ...userData, ...defaults });
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

            <TouchableOpacity onPress={this.onFbSignup.bind(this)}>
              <SocialIcon
                style={{ width: 200 }}
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
