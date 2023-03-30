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
import { auth, database } from "../../../config/config.js";
import { SocialIcon } from "react-native-elements";
import { FacebookAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithCredential, updateProfile } from "firebase/auth";
import { ref, update } from "firebase/database";

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      Password: "",
      ConfirmPassword: "",
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

  authenticate = async (token) => {
    const credential = FacebookAuthProvider.credential(token);
    const ret = await signInWithCredential(auth, credential);
    return ret;
  };

  createUser = (uid, userData, token, dp) => {
    const defaults = {
      uid,
      token,
      dp,
      ageRange: [20, 30],
    };
    update(ref(database, "users/" + uid), { ...userData, ...defaults });
  };

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
                  onChangeText={text => this.setState({ name: text })}
                />
                <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  style={styles.input}
                  onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                  placeholder="Pasword"
                  secureTextEntry={true}
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  style={styles.input}
                  onChangeText={text => this.setState({ Password: text })}
                />
                <TextInput
                  placeholder="Confirm Pasword"
                  secureTextEntry={true}
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  style={styles.input}
                  onChangeText={text => this.setState({ ConfirmPassword: text })}
                />
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={this.signUpAsync} style={styles.loginButton}>
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
  register() {
    let email = this.state.email;
    let name = this.state.name;
    let password = this.state.Password;

    const { navigate } = this.props.navigation;

    createUserWithEmailAndPassword(auth, email, password)
      .then(function (data) {
        updateProfile(data.user, {
          displayName: name,
        })
          .then(
            function () {
              console.log("Updated User Data..");
            },
            function (error) {
              console.log("Error Updating User Data.." + error);
            }
          );
        alert("Welcome to Go Social!");
        navigate("App");
      })
      .catch(function (error) {
        var errorMessage = error.message;
        console.log("Error = " + errorMessage);
        alert(errorMessage);
      });
  }

  signUpAsync = async () => {
    if (EmailValidator.validate(this.state.email) === true) {
      if (this.state.Password === this.state.ConfirmPassword) {
        this.register();
      } else {
        alert("password Missmatch");
      }
    } else {
      alert("Please enter A Valid Email");
    }
  };
}
