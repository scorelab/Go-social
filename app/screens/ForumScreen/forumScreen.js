import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import ForumBox from '../../components/ForumBox/ForumBox';
import styles from './styles';


export default class ForumScreen extends Component {
    render() {
        return (
            <View>
                <HeaderBar image={require("../../images/Ask-SCORE-Logo.png")} title={"Home"} />

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                    <ForumBox Question="Enter your Question here" />
                    <ForumBox Question="Enter your Question here" />
                    <ForumBox Question="Enter your Question here" />
                </ScrollView>
            </View>
        );
    }
}
