//done 
import React, { Component } from "react";
import FriendMessage from "../../components/MessageComponents/friendMessage";
import MyMessage from "../../components/MessageComponents/myMessage";
import ModalHeaderNavigationBar from "../../components/ModalHeaderNavigationBar/modalHeaderNavigationBar";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import styles from "./style";
import Ionicons from "react-native-vector-icons/FontAwesome";
import { auth, database } from "../../../config/config.js";
import { onAuthStateChanged } from "firebase/auth";
import { child, onValue, ref, set, update } from "firebase/database";

export default class MessageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: "",
      messageList: [],
      newMessageId: this.uniqueId(),
      newChatId: this.uniqueId(),
      loaded: false,
      loggedin: false,
      friendId: "",
    };
  }

  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  uniqueId = () => {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4()
    );
  };

  check = () => {
    var params = this.props.navigation.state.params;
    console.log("Friend ID IS" + params.userId);
    if (params) {
      if (params.userId) {
        this.setState({
          friendId: params.userId,
        });
        var that = this;
        var userCollectonRef = ref(database, "users");
        let userRef = child(userCollectonRef, params.userId)
        let firstNameRef = child(userRef , "firstName")
        onValue(firstNameRef,
          function (snapshot) {
            const exist = snapshot.val() != null;
            if (exist) data = snapshot.val();
            console.log(data);
            that.setState({
              friendName: data,
            });
          })
    
        let avatarRef = child(userRef,"avatar" )
        onValue(avatarRef,function (snapshot) {
          const exist = snapshot.val() != null;
          if (exist) data = snapshot.val();
          console.log(data);
          that.setState({
            friendAvatar: data,
          });
        })
          

        this.fetchMessages(params.userId);
      }
    }
  };

  timePlural = s => {
    if (s == 1) {
      return " ago";
    } else {
      return "s ago";
    }
  };

  timeConvertor = timestamp => {
    var a = new Date(timestamp * 1000);
    var seconds = Math.floor((new Date() - a) / 1000);

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + " Year" + this.timePlural(interval);
    }

    var interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " Month" + this.timePlural(interval);
    }

    var interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " Day" + this.timePlural(interval);
    }

    var interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " Hour" + this.timePlural(interval);
    }

    var interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " Minute" + this.timePlural(interval);
    }

    return Math.floor(seconds) + " Second" + this.timePlural(seconds);
  };

  fetchMessages = () => {
    var that = this;
    var userId = auth.currentUser.uid;

    var userCollectonRef = ref(database, "users");
    let userChatRef = child(child(child(userCollectonRef,userId),"userChats"),this.state.friendId);
    onValue(userChatRef,function (snapshot) {
      const exist = snapshot.exists();
      if (exist) {
        var data = snapshot.val();
        var chatMessageRef= child(ref(database,"chatMessages"),Object.keys(data)[0]);
        onValue(chatMessageRef,function (snapshot) {
          const exsist = snapshot.exists();
          if (exsist) {
            that.setState({
              messageList: [],
            });
            var data = snapshot.val();
            console.log(Object.keys(data)[0].message);
            var messageList = that.state.messageList;
            Object.keys(data).forEach(key => {
              messageList.push({
                message: data[key].message,
                posted: data[key].posted,
                sendby: data[key].sendby,
              });
            });

            console.log(messageList);
            that.setState({
              loaded: true,
            });
          } else {
            that.setState({
              messageList: [],
              loaded: true,
            });
          }
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        })
          
          
      }
    },
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })
      
      
  };

  sendMessage = () => {
    if (
      this.state.loggedin == true &&
      this.state.newMessage != "" &&
      this.state.friendId != "[object Object]"
    ) {
      var that = this;
      var date = Date.now();
      var posted = Math.floor(date / 1000);
      var userId = auth.currentUser.uid;

      onValue(child(child(child(ref(database,"users"),userId),"userChats"),this.state.friendId),
      function (snapshot) {
        const exist = snapshot.exists();
        if (exist) {
          data = snapshot.val();
          let cId = Object.keys(data)[0];
          var newMessage = {
            sendby: userId,
            message: that.state.newMessage,
            status: 0,
            posted: posted,
          };
          that.setState({
            newMessageId: that.uniqueId(),
          });
          set(ref(database,"/chatMessages/" + cId + "/" + that.state.newMessageId),newMessage);
          update(ref(database,"/users/" + userId + "/userChats/" + that.state.friendId + "/" + cId),{ posted: posted, lastMessage: that.state.newMessage });
          update(ref(database,"/users/" + that.state.friendId + "/userChats/" + userId + "/" + cId),{ posted: posted, lastMessage: that.state.newMessage });

          that.setState({
            newMessage: "",
          });
        } else {
          var chatUserf = {
            lastMessage: that.state.newMessage,
            posted: posted,
            friend: that.state.friendId,
            name: that.state.friendName,
            avatar: that.state.friendAvatar,
          };
          var chatUser = {
            lastMessage: that.state.newMessage,
            posted: posted,
            friend: userId,
            name: auth.currentUser.displayName,
            avatar: that.state.avatar,
          };
          var newMessage = {
            sendby: userId,
            message: that.state.newMessage,
            status: 0,
            posted: posted,
          };
          set(ref(database,"/users/" +
          userId +
          "/userChats/" +
          that.state.friendId +
          "/" +
          that.state.newChatId),chatUserf);
          set(ref(database,"/users/" +
          that.state.friendId +
          "/userChats/" +
          userId +
          "/" +
          that.state.newChatId),chatUser);
          set(ref(database,"/users/" +
          userId +
          "/userChats/" +
          that.state.friendId +
          "/" +
          that.state.newChatId),chatUserf);
          set(ref(database,"/chatMessages/" + that.state.newChatId + "/" + that.state.newMessageId),newMessage);
          
        }
      })
      
      //   .catch();
      // that.textInput.clear();
    }
  };

  componentDidMount = () => {
    var that = this;
    onAuthStateChanged(auth,function (user) {
      if (user) {
        that.setState({
          loggedin: true,
        });
        that.check();
        var userId = auth.currentUser.uid;
        var userNameRef = child(child(ref(database,"users"),userId),"name");
        onValue(userNameRef,function (snapshot) {
          const exist = snapshot.val() != null;
          if (exist) data = snapshot.val();
          console.log(data);
          that.setState({
            name: data,
          });
        })
        
        var userIdRef= child(child(ref(database,"users"),userId),"avatar");
        onValue(userIdRef,function (snapshot) {
          const exist = snapshot.val() != null;
          if (exist) data = snapshot.val();
          console.log(data);
          that.setState({
            avatar: data,
          });
        })
        
      } else {
        that.setState({
          loggedin: false,
        });
      }
    });
  };
  renderMessages = () => {
    this.state.messageList.sort((a, b) => (a.posted > b.posted ? 1 : b.posted > a.posted ? -1 : 0));

    return this.state.messageList.map((item, index) => {
      return (
        <View>
          {item.sendby != auth.currentUser.uid ? (
            <FriendMessage message={item.message} posted={this.timeConvertor(item.posted)} />
          ) : (
            <MyMessage message={item.message} posted={this.timeConvertor(item.posted)} />
          )}
        </View>
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ModalHeaderNavigationBar
          title={"Toney Herford"}
          onPress={() => this.props.navigation.goBack()}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          ref={ref => (this.scrollView = ref)}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({ animated: true });
          }}>
          <FriendMessage message={"Hello How Are You"} posted={"2 min ago"} />
          <MyMessage message={"I am fine Thank You"} posted={"2 min ago"} />
          <FriendMessage message={"Hello How Are You"} posted={"2 min ago"} />
          <MyMessage message={"I am fine Thank You"} posted={"2 min ago"} />
          <FriendMessage message={"Hello How Are You"} posted={"2 min ago"} />
          <MyMessage message={"I am fine Thank You"} posted={"2 min ago"} />
          <FriendMessage message={"Hello How Are You"} posted={"2 min ago"} />
          <MyMessage message={"I am fine Thank You"} posted={"2 min ago"} />
          <FriendMessage message={"Hello How Are You"} posted={"2 min ago"} />
          <MyMessage message={"I am fine Thank You"} posted={"2 min ago"} />
          <FriendMessage message={"Hello How Are You"} posted={"2 min ago"} />
          <MyMessage message={"I am fine Thank You"} posted={"2 min ago"} />
          {this.renderMessages()}
        </ScrollView>

        <KeyboardAvoidingView enabled={true} behavior={"height"}>
          <View style={styles.messageArea}>
            <TextInput
              underlineColorAndroid="#428AF8"
              style={styles.messageInput}
              placeholder={"Enter Message Here"}
              editable={true}
              multiline={true}
              maxlength={100}
              onChangeText={text => this.setState({ newMessage: text })}
              ref={input => {
                this.textInput = input;
              }}
            />
            <TouchableOpacity onPress={this.sendMessage} style={styles.sendArea}>
              <Ionicons name={"paper-plane"} size={35} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
