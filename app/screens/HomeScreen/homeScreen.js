import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import { DetailView, Info } from "..";
import HeaderNavigationBar from '../../components/HeaderNavigationBar/HeaderNavigationBar';
import HomePostComponent from '../../components/HomePostComponent/HomePostComponent';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
export default class HomeScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <HeaderNavigationBar title={"Home"} />
                
                <TouchableOpacity style={styles.postButton} onPress={() => this.props.navigation.navigate("NewPost")}>
                    <View style={styles.row}>
                        <Image style={styles.profileImage} source={require('../../images/user_image_1.jpg')} />
                        <Text style={styles.text}> Whats on Your Mind?</Text>
                    </View>
                </TouchableOpacity>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                    <HomePostComponent />
                    <HomePostComponent />
                    <HomePostComponent />
                </ScrollView>
            </View>
        );
    }
}
