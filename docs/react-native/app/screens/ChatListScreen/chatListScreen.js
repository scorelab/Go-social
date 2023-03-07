import React, { Component } from 'react';
import { View, Text, Button, StatusBar, Image, ScrollView } from 'react-native';
import styles from './style';
import ConversationBanner from '../../components/ConversationBanner/conversationBanner';
import SuggestCardView from '../../components/SuggestionsCardView/suggestionsCardView';
import HeaderNavigationBar from '../../components/HeaderNavigationBar/HeaderNavigationBar';
import { f, auth, storage, database } from '../../../config/config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class ChatListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatList: [],
      loaded: false,
      userList: [],
      loggedin: false,
    };
  }

  fetchUsers = () => {
    var that = this;
    var userId = f.auth().currentUser.uid;
    database.ref('users').once(
      'value',
      function (snapshot) {
        const exsist = snapshot.val() != null;
        if (exsist) {
          data = snapshot.val();
          var userList = that.state.userList;
          for (var user in data) {
            let userObj = data[user];
            let uId = user;
            if (uId != userId) {
              userList.push({
                id: uId,
                name: userObj.firstName,
                avatar: userObj.avatar,
              });
            }
          }
          that.setState({
            userList: userList,
          });
        }
      },
      function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      }
    );
  };
  renderUserList = () => {
    if (this.state.loggedin == true) {
      console.log(this.state.userList);
      return this.state.userList.map((items, index) => {
        return (
          <SuggestCardView
            key={items.id}
            onPress={() => this.props.navigation.navigate('MessageView', { userId: items.id })}
            name={items.name}
            userImage={{ uri: items.avatar }}
          />
        );
      });
    }
  };
  fetchchats = () => {
    if (this.state.loggedin == true) {
      var that = this;
      var userId = f.auth().currentUser.uid;
      database
        .ref('users')
        .child(userId)
        .child('userChats')
        .on(
          'value',
          function (snapshot) {
            const exist = snapshot.exists();
            that.setState({
              chatList: [],
            });
            if (exist) {
              var data = snapshot.val();
              const exsist = snapshot.exists();
              if (exsist) {
                var data = snapshot.val();
                var chatList = that.state.chatList;
                Object.keys(data).forEach(key => {
                  var tempdata = data[key];
                  Object.keys(tempdata).forEach(key => {
                    chatList.push({
                      posted: tempdata[key].posted,
                      lastMessage: tempdata[key].lastMessage,
                      name: tempdata[key].name,
                      avatar: tempdata[key].avatar,
                      id: tempdata[key].friend,
                    });
                  });
                });
                console.log(chatList);
                that.setState({
                  loaded: true,
                });
              } else {
                that.setState({
                  chatList: [],
                  loaded: true,
                });
              }
            }
          },
          function (errorObject) {
            console.log('The read failed: ' + errorObject.code);
          }
        );
    }
  };
  timePlural = s => {
    if (s == 1) {
      return ' ago';
    } else {
      return 's ago';
    }
  };

  timeConvertor = timestamp => {
    var a = new Date(timestamp * 1000);
    var seconds = Math.floor((new Date() - a) / 1000);

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + ' Year' + this.timePlural(interval);
    }

    var interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + ' Month' + this.timePlural(interval);
    }

    var interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + ' Day' + this.timePlural(interval);
    }

    var interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + ' Hour' + this.timePlural(interval);
    }

    var interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + ' Minute' + this.timePlural(interval);
    }

    return Math.floor(seconds) + ' Second' + this.timePlural(seconds);
  };

  renderMessageList = () => {
    if (this.state.loggedin == true) {
      this.state.chatList.sort((a, b) => (a.posted > b.posted ? 1 : b.posted > a.posted ? -1 : 0));
      this.state.chatList.reverse();

      return this.state.chatList.map((items, index) => {
        return (
          <ConversationBanner
            key={items.id}
            name={items.name}
            posted={this.timeConvertor(items.posted)}
            onPress={() => this.props.navigation.navigate('MessageView', { userId: items.id })}
            userImage={{ uri: items.avatar }}
            message={items.lastMessage}
            count="2"
          />
        );
      });
    }
  };
  componentDidMount = () => {
    var that = this;
    f.auth().onAuthStateChanged(function (user) {
      if (user) {
        that.setState({
          loggedin: true,
        });
        that.fetchUsers();
        that.fetchchats();
      }
    });
  };
  viewChat = userId => {
    this.props.navigation.navigate('MessageView', { userId: userId });
  };
  render() {
    return (
      <View style={styles.container}>
        <HeaderNavigationBar title={'Messages'} {...this.props} />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.suggestUserArea}>
            <View style={styles.latestMessageArea}>
              <View style={styles.subHeaderArea}>
                <Text style={styles.subHeaderText}>Suggestions</Text>
              </View>
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScrollView}>
              {this.renderUserList()}
              <SuggestCardView
                onPress={this.viewChat}
                name={'Cherryl'}
                userImage={require('../../images/user_image_1.jpg')}
              />
              <SuggestCardView
                onPress={this.viewChat}
                name={'Cherryl'}
                userImage={require('../../images/user_image_1.jpg')}
              />
              <SuggestCardView
                onPress={this.viewChat}
                name={'Cherryl'}
                userImage={require('../../images/user_image_1.jpg')}
              />
              <SuggestCardView
                onPress={this.viewChat}
                name={'Cherryl'}
                userImage={require('../../images/user_image_1.jpg')}
              />
              <SuggestCardView
                onPress={this.viewChat}
                name={'Cherryl'}
                userImage={require('../../images/user_image_1.jpg')}
              />
              <SuggestCardView
                onPress={this.viewChat}
                name={'Cherryl'}
                userImage={require('../../images/user_image_1.jpg')}
              />
              <SuggestCardView
                onPress={this.viewChat}
                name={'Cherryl'}
                userImage={require('../../images/user_image_1.jpg')}
              />
            </ScrollView>
          </View>
          <View style={styles.latestMessageArea}>
            <View style={styles.subHeaderArea}>
              <Text style={styles.subHeaderText}>Last Messages</Text>
            </View>
            {this.renderMessageList()}
            <ConversationBanner
              name="Toney Herford"
              posted="2 days ago"
              onPress={this.viewChat}
              userImage={require('../../images/user_image_1.jpg')}
              message="Hello Jhon, I would like to invite you to participate ..."
              count="5"
            />
            <ConversationBanner
              name="Toney Herford"
              posted="2 days ago"
              onPress={this.viewChat}
              userImage={require('../../images/user_image_1.jpg')}
              message="Hello Jhon, I would like to invite you to participate ..."
              count="2"
            />
            <ConversationBanner
              name="Toney Herford"
              posted="2 days ago"
              onPress={this.viewChat}
              userImage={require('../../images/user_image_1.jpg')}
              message="Hello Jhon, I would like to invite you to participate ..."
              count="3"
            />
            <ConversationBanner
              name="Toney Herford"
              posted="2 days ago"
              onPress={this.viewChat}
              userImage={require('../../images/user_image_1.jpg')}
              message="Hello Jhon, I would like to invite you to participate ..."
              count="7"
            />
            <ConversationBanner
              name="Toney Herford"
              posted="2 days ago"
              onPress={this.viewChat}
              userImage={require('../../images/user_image_1.jpg')}
              message="Hello Jhon, I would like to invite you to participate ..."
              count="2"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
