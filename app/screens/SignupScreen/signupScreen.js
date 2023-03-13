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
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
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

  async signup() {
    try {
      let name = this.state.name;
      let email = this.state.email;
      let password = this.state.password;

      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      console.log("\n\nUpdated user data successfully! : ", auth.currentUser);
    } catch (error) {
      console.log(error);
      alert(error.message.toString());
    }
  }

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

  onPressLogin() {
    LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
      result => this._handleCallBack(result),
      function (error) {
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
            this.authenticate(data.accessToken).then(function (result) {
              const { uid } = result;
              _this.createUser(uid, json, token, fbImage);
            });
          })
          .catch(function (err) {
            console.log(err);
          });
      });
    }
  }

  authenticate = token => {
    const provider = auth.FacebookAuthProvider;
    const credential = provider.credential(token);
    let ret = auth.signInWithCredential(credential);
    return ret;
  };

  createUser = (uid, userData, token, dp) => {
    const defaults = {
      uid,
      token,
      dp,
      ageRange: [20, 30],
    };
    f.database()
      .ref("users")
      .child(uid)
      .update({ ...userData, ...defaults });
  };

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

            <TouchableOpacity onPress={this.onPressLogin.bind(this)}>
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
