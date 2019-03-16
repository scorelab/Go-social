import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import { DetailView, Info } from "..";
import HeaderNavigationBar from '../../components/HeaderNavigationBar/HeaderNavigationBar';
import styles from './style';
import { Card , ListItem , Icon  } from 'react-native-elements';
import { TextInput } from "react-native-gesture-handler";

export default class NewPostScreen extends Component {
   
    render() {
        return (
            <View style={styles.container}>
                <HeaderNavigationBar title={"New Post"} />
                <View style={styles.row}>
                    <Image style={styles.profileImage} source={require('../../images/user_image_1.jpg')} />
                    <Text style={styles.nameText}>John Doe</Text>
                </View>
                <TextInput
                    style={styles.text}
                    placeholder={'What is on your mind?'}
                    editable={true}
                    multiline={true}>
                </TextInput>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.list}>
                        <ListItem
                            title={"Add Photo"}
                            leftIcon={{ name: "photo" }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.list}>
                        <ListItem
                            title={"Take a Picture"}
                            leftIcon={{ name: "camera" }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.list}>
                        <ListItem
                            title={"Tag People"}
                            leftIcon={{ name: "people" }}
                        />
                    </TouchableOpacity>
                    
                </ScrollView>
            </View>
        );
    }
}
