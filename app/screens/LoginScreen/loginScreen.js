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
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { app, auth, db } from "../../../config/config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithCredential,
  FacebookAuthProvider,
} from "firebase/auth";
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
    const that = this;
    onAuthStateChanged(auth, function (user) {
      if (user) {
        that.props.navigation.navigate("App");
      }
    });
  }

  async onLogin() {
    try {
      console.log("reached here", this.state);
      let email = this.state.email;
      let password = this.state.password;
      // let { navigate } = this.props.navigation;

      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in!");
    } catch (error) {
      alert(error.message.toString());
    }
  }

  async _signInAsync() {
    console.log(this.state);
    if (EmailValidator.validate(this.state.email) === true) {
      if (this.state.password != "") {
        this.onLogin();
      } else {
        alert("Enter the password");
      }
    } else {
      alert("Please enter A Valid Email");
    }
  }

  async onFbLogin() {
    try {
      const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);

      if (result.isCancelled) {
        throw new Error("User cancelled the login process");
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

            <TouchableOpacity onPress={this.onFbLogin.bind(this)}>
              <SocialIcon
                style={{ width: 200 }}
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
