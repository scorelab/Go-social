import React, { Component } from "react";
import { Text, View, TextInput, ScrollView, Image,PermissionsAndroid , Button, AsyncStorage } from "react-native";
import { Info, DeatilView } from "..";
import HeaderNavigationBar from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import styles from './style'
import { f, auth, storage, database } from "../../../config/config.js";
import { Avatar } from 'react-native-elements';
import ImagePicker from "react-native-image-picker";

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
            address: "",
        };
    }

    componentDidMount() {
        var that = this;
        f.auth().onAuthStateChanged(function (user) {
            if (user) {
                that.state.email = f.auth().currentUser.email;
                f.database().ref('users').child(f.auth().currentUser.uid).once('value',function(snapshot){
                    that.state.firstName=snapshot.child('firstName').val();
                    that.state.lastName=snapshot.child('lastName').val();
                    that.state.contact=snapshot.child('contact').val();
                    that.state.address=snapshot.child('address').val();
                })
            }
        });
        this.requestCameraPermission();
    }

    requestCameraPermission = async () => {
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
        console.log("User hihi!");
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
                this.uploadImage();
            }
        });

    };

    uploadImage = async () => {
        console.log("Uploading Image!!!!");
        var uri = this.state.pickedImage
        var that = this;
        var userId = f.auth().currentUser.uid;
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(uri)[1];

        this.setState({
            currentFileType: ext,
            uploading: true
        });
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
        var filePath = userId + '.' + that.state.currentFileType;

        var uploadTask = storage.ref('user/img').child(filePath).put(blob);

        uploadTask.on('state_changed', function (snapshot) {
            let progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            that.setState({
                progress: progress
            });
        }, function (error) {
            console.log(error);
        }, function () {
            that.setState({
                progress: 100
            });
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                
                that.setDatabse(downloadURL);
            })
        })

    }

    setDatabse = (imageURL) => {
        var user = f.auth().currentUser;
        //var userID = f.auth().currentUser.uid;
        //database.ref('/users/' + userID).set({"avatar":imageURL});
        console.log("User: "+user);
        user.updateProfile({
            photoURL: imageURL
        });
        alert('SuccessFully Published!!');
        this.setState({
            imageSelected: false,
            uploading: false,
            progress: 0,
            caption: ''
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderNavigationBar title={"Profile"} {...this.props} />
                <ScrollView style={{width:'100%'}}>
                    <View style={styles.container}>
                        <View style={styles.coverImageArea}>
                            <Image style={styles.coverImage} source={require('../../images/cover_photo.jpeg')} />
                        </View>
                        <Avatar
                            onPress={this._handleButtonPress}
                            rounded
                            style={styles.profileImage}
                            source={{
                                uri: f.auth().currentUser.photoURL
                            }}
                            showEditButton
                        />
                        {/* <Image style={styles.profileImage} source={require('../../images/user_image_1.jpg')} /> */}
                        <View style={styles.contentArea}>
                            <Text style={styles.nameFont}>John Doe</Text>
                            <Text style={styles.cityFont}>Los Angeles</Text>
                        </View>
                        <Button title="Sign Out" onPress={this.logout} />
                    </View>
                    <View>
                        <TextInput
                            placeholder="First Name"
                            placeholderTextColor="rgba(255,255,255,0.8)"
                            style={styles.input}
                            onChangeText={text => this.setState({ firstName: text })}
                            value = {this.state.firstName.toString()}
                        />
                        <TextInput
                            placeholder="Last Name"
                            placeholderTextColor="rgba(255,255,255,0.8)"
                            style={styles.input}
                            onChangeText={text => this.setState({ lastName: text} )}
                            value = {this.state.lastName.toString()}
                        />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="rgba(255,255,255,0.8)"
                            style={styles.input}
                            onChangeText={text => this.setState({ email: text} )}
                            value = {this.state.email.toString()}
                        />
                        <TextInput
                            placeholder="Contact Number"
                            placeholderTextColor="rgba(255,255,255,0.8)"
                            style={styles.input}
                            onChangeText={text => this.setState({ contact: text} )}
                            value = {this.state.contact.toString()}
                        />
                        <TextInput
                            placeholder="Address"
                            placeholderTextColor="rgba(255,255,255,0.8)"
                            style={styles.input}
                            onChangeText={text => this.setState({ address: text} )}
                            value = {this.state.address}
                        />
                    </View>
                    <Button style={styles.saveButton} title="Save" onPress={this.save} />
                </ScrollView>
            </View>
        );
    }
    logout = () => {        
        f.auth().signOut();
        const { navigate } = this.props.navigation;
        navigate('Login');
    }

    save = () => {

        var firstName = this.state.firstName;
        var lastName = this.state.lastName;
        var contact = this.state.contact;
        var address = this.state.address;
        var email = this.state.email;

        let user = {
            "firstName":firstName,
            "lastName":lastName,
            "email":email,
            "contact":contact,
            "address":address
        }
        
        console.log(user)
        f.database()
            .ref('users/')
            .child(f.auth().currentUser.uid)
            .set(user);
    }

}
