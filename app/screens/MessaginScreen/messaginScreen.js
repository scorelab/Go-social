import React, { Component } from 'react'
import FriendMessage from '../../components/MessageComponents/friendMessage'
import MyMessage from '../../components/MessageComponents/myMessage'
import ModalHeaderNavigationBar from "../../components/ModalHeaderNavigationBar/modalHeaderNavigationBar";
import { View, TextInput, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView } from "react-native";
import styles from './style';
import Ionicons from "react-native-vector-icons/FontAwesome";
import { f, auth, storage, database } from "../../../config/config.js";
export default class messaginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessage: '',
            messageList: [],
            newMessageId: this.uniqueId(),
            newChatId: this.uniqueId(),
            loaded: false,
        }
    }

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    check = () => {
        var params = this.props.navigation.state.params;
        console.log("Friend ID IS"+params.userId)
        if (params) {
            
            if (params.userId) {
                this.setState({
                    friendId: params.userId
                });
                var that = this;
                database.ref('users').child(params.userId).child('firstName').once('value').then(function (snapshot) {
                    const exist = (snapshot.val() != null);
                    if (exist) data = snapshot.val();
                    console.log(data)
                    that.setState({
                        friendName: data
                    });
                });

                this.fetchMessages(params.userId);
                
            }
        }

    }

    timePlural = (s) => {
        if (s == 1) {
            return ' ago'
        } else {
            return 's ago'
        }
    }

    timeConvertor = (timestamp) => {
        var a = new Date(timestamp * 1000);
        var seconds = Math.floor((new Date() - a) / 1000);

        var interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + ' Year' + this.timePlural(interval);
        }

        var interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + ' Month' + this.timePlural(interval);
        }

        var interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + ' Day' + this.timePlural(interval);
        }

        var interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + ' Hour' + this.timePlural(interval);
        }

        var interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + ' Minute' + this.timePlural(interval);
        }

        return Math.floor(seconds) + ' Second' + this.timePlural(seconds)
    }

    fetchMessages = () => {

        var that = this;
        var userId = f.auth().currentUser.uid;
        database.ref('users').child(userId).child('userChats').child(this.state.friendId).on('value', (function (snapshot) {
            const exist = (snapshot.exists());
            if (exist) {
                var data = snapshot.val();
                database.ref('chatMessages').child(Object.keys(data)[0]).on('value', (function (snapshot) {
                    const exsist = (snapshot.exists());
                    if (exsist) {
                        that.setState({
                            messageList: []
                        })
                        var data = snapshot.val()
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
                            loaded: true
                        })
                    } else {
                        that.setState({
                            messageList: [],
                            loaded: true
                        })
                    }
                }), function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });

            }
        }), function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });


    }

    sendMessage = () => {
        
        var that = this;
        var date = Date.now();
        var posted = Math.floor(date / 1000)
        var userId = f.auth().currentUser.uid;        
        database.ref('users').child(userId).child('userChats').child(this.state.friendId).once('value').then(function (snapshot) {
            const exist = (snapshot.exists());
            if (exist) {
                data = snapshot.val();
                let cId = (Object.keys(data)[0]);
                var newMessage = {
                    sendby: userId,
                    message: that.state.newMessage,
                    status: 0,
                    posted: posted

                }
                that.setState({
                    newMessageId: that.uniqueId(),
                })
                database.ref('/chatMessages/' + cId + '/' + that.state.newMessageId).set(newMessage);
                database.ref('/users/' + userId + '/userChats/' + that.state.friendId + '/' + cId).update({ posted: posted, lastMessage: that.state.newMessage });
                database.ref('/users/' + that.state.friendId + '/userChats/' + userId + '/' + cId).update({ posted: posted, lastMessage: that.state.newMessage });
                that.setState({
                    newMessage: '',
                })
            } else {
                // alert("no HIll")
                var chatUserf = {
                    lastMessage: that.state.newMessage,
                    posted: posted,
                    friend: that.state.friendId,
                    name: that.state.friendName,                    
                }

                var chatUser = {
                    lastMessage: that.state.newMessage,
                    posted: posted,
                    friend: userId,
                    name: f.auth().currentUser.displayName                    
                }
                var newMessage = {
                    sendby: userId,
                    message: that.state.newMessage,
                    status: 0,
                    posted: posted

                }
                database.ref('/users/' + userId + '/userChats/' + that.state.friendId + '/' + that.state.newChatId).set(chatUserf);
                database.ref('/users/' + that.state.friendId + '/userChats/' + userId + '/' + that.state.newChatId).set(chatUser);
                database.ref('/chatMessages/' + that.state.newChatId + '/' + that.state.newMessageId).set(newMessage);

            }
        }).catch()
        that.textInput.clear()
        
    }

    componentDidMount = () => {
        var that = this;
        f.auth().onAuthStateChanged(function (user) {
            if (user) {
                that.setState({
                    loggedin: true,
                });
                console.log("Hello")
                that.check()
                var userId = f.auth().currentUser.uid;
                database.ref('users').child(userId).child('name').once('value').then(function (snapshot) {
                    const exist = (snapshot.val() != null);
                    if (exist) data = snapshot.val();
                    console.log(data)
                    that.setState({
                        name: data
                    });
                });                
            } else {
                that.setState({
                    loggedin: false
                })
            }
        })

    }
    renderMessages = () => {        
        this.state.messageList.sort((a, b) => (a.posted > b.posted) ? 1 : ((b.posted > a.posted) ? -1 : 0));
        
        return this.state.messageList.map((item, index) => {
            return (
                <View>
                    {item.sendby != f.auth().currentUser.uid ? (
                        <FriendMessage message={item.message} posted={this.timeConvertor(item.posted)} />                        
                    ) : (
                        <MyMessage message={item.message} posted={this.timeConvertor(item.posted)}  /> 
                        )}
                </View>
            )
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <ModalHeaderNavigationBar title={"Toney Herford"} onPress={() => this.props.navigation.goBack()} />

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.scrollView.scrollToEnd({ animated: true });
                    }}
                >
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

                <KeyboardAvoidingView enabled={true} behavior={'height'}>
                    <View style={styles.messageArea}>
                        <TextInput
                            underlineColorAndroid="#428AF8"
                            style={styles.messageInput}
                            placeholder={'Enter Message Here'}
                            editable={true}
                            multiline={false}
                            maxlength={100}
                            onChangeText={(text) => this.setState({ newMessage: text })}
                            ref={input => { this.textInput = input }}
                        />
                        <TouchableOpacity onPress={this.sendMessage} style={styles.sendArea}>
                            <Ionicons name={"paper-plane"} size={35} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

            </View >
        );
    }

}