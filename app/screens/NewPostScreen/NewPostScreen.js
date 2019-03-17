import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity, Image, PermissionsAndroid, CameraRoll } from "react-native";
import { DetailView, Info } from "..";
import HeaderNavigationBar from '../../components/HeaderNavigationBar/HeaderNavigationBar';
import styles from './style';
import { Card, ListItem, Icon } from 'react-native-elements';
import { TextInput } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-picker";
export default class NewPostScreen extends Component {
    constructor() {
        super()
        this.state = {
            imageSelected: false,
            pickedImage: null
        }
    }
    componentDidMount = () => {
        this.equestCameraPermission();
    }
    equestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Go Social Camera Permission',
                    message:
                        'Go Social App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
    _handleButtonPress = () => {
        ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
            if (res.didCancel) {
                console.log("User cancelled!");
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                this.setState({
                    pickedImage: res.uri,
                    imageSelected: true
                });
                alert(res.uri)

            }
        });

    };


    render() {
        return (
            <View style={styles.container}>
                <HeaderNavigationBar title={"New Post"} />
                <View style={styles.row}>
                    <Image style={styles.profileImage} source={require('../../images/user_image_1.jpg')} />
                    <Text style={styles.nameText}>John Doe</Text>
                </View>
                {this.state.imageSelected == true ? (
                    <View>
                        <Image source={{ uri: this.state.pickedImage }} style={{ width: 100, height: 100 }} />
                    </View>
                ) : (
                        <View></View>
                    )}
                <TextInput
                    style={styles.text}
                    placeholder={'What is on your mind?'}
                    editable={true}
                    multiline={true}>
                </TextInput>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>

                    <TouchableOpacity style={styles.list} onPress={this._handleButtonPress}>
                        <ListItem
                            title={"Add Photo"}
                            leftIcon={{ name: "photo" }}
                        />
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.list}>
                        <ListItem
                            title={"Take a Picture"}
                            leftIcon={{ name: "camera" }}
                        />
                    </TouchableOpacity> */}

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
