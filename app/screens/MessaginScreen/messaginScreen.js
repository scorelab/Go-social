import React, { Component } from 'react'
import FriendMessage from '../../components/MessageComponents/friendMessage'
import MyMessage from '../../components/MessageComponents/myMessage'
import ModalHeaderNavigationBar from "../../components/ModalHeaderNavigationBar/modalHeaderNavigationBar";
import { View, TextInput, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView } from "react-native";
import styles from './style';
import Ionicons from "react-native-vector-icons/FontAwesome";
export default class messaginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessage: '',
        }
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