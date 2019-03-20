import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    AsyncStorage,
    StatusBar,
    Image,
    ScrollView,
} from 'react-native'
import styles from './style'
import ConversationBanner from '../../components/ConversationBanner/conversationBanner'
import SuggestCardView from '../../components/SuggestionsCardView/suggestionsCardView'
import HeaderNavigationBar from "../../components/HeaderNavigationBar/HeaderNavigationBar";

export default class ChatListScreen extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <HeaderNavigationBar title={"Messages"} {...this.props} />
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                    {/* <Text style={styles.headerText}>MESSAGES</Text> */}
                    <View style={styles.suggestUserArea} >
                        <View style={styles.latestMessageArea}>
                            <View style={styles.subHeaderArea}>
                                <Text style={styles.subHeaderText}>Suggestions</Text>
                            </View>
                        </View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
                            <SuggestCardView name={"Cherryl"} userImage={require('../../images/user_image_1.jpg')} />
                            <SuggestCardView name={"Cherryl"} userImage={require('../../images/user_image_1.jpg')} />
                            <SuggestCardView name={"Cherryl"} userImage={require('../../images/user_image_1.jpg')} />
                            <SuggestCardView name={"Cherryl"} userImage={require('../../images/user_image_1.jpg')} />
                            <SuggestCardView name={"Cherryl"} userImage={require('../../images/user_image_1.jpg')} />
                            <SuggestCardView name={"Cherryl"} userImage={require('../../images/user_image_1.jpg')} />
                            <SuggestCardView name={"Cherryl"} userImage={require('../../images/user_image_1.jpg')} />
                        </ScrollView>
                    </View>
                    <View style={styles.latestMessageArea}>
                        <View style={styles.subHeaderArea}>
                            <Text style={styles.subHeaderText}>Last Messages</Text>
                        </View>
                        <ConversationBanner
                            name='Toney Herford'
                            posted='2 days ago'                                                       
                            userImage={require('../../images/user_image_1.jpg')}
                            message="Hello Jhon, I would like to invite you to participate ..."
                            count="5"
                        />
                        <ConversationBanner
                            name='Toney Herford'
                            posted='2 days ago'                            
                            userImage={require('../../images/user_image_1.jpg')}
                            message="Hello Jhon, I would like to invite you to participate ..."
                            count="2"
                        />
                        <ConversationBanner
                            name='Toney Herford'
                            posted='2 days ago'                            
                            userImage={require('../../images/user_image_1.jpg')}
                            message="Hello Jhon, I would like to invite you to participate ..."
                            count="3"
                        />
                        <ConversationBanner
                            name='Toney Herford'
                            posted='2 days ago'                            
                            userImage={require('../../images/user_image_1.jpg')}
                            message="Hello Jhon, I would like to invite you to participate ..."
                            count="7"
                        />
                        <ConversationBanner
                            name='Toney Herford'
                            posted='2 days ago'                            
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