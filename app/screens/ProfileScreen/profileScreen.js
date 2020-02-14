import React, { Component } from "react";
import { Text, View, TextInput, ScrollView, Image,
    PermissionsAndroid , Button, AsyncStorage, ActivityIndicator, TouchableOpacity  } from "react-native";
import { Info, DeatilView } from "..";
import HeaderNavigationBar from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import styles from './style'
import { f, auth, storage, database } from "../../../config/config.js";
import { Avatar } from 'react-native-elements';
import ImagePicker from "react-native-image-picker";
// import { TouchableOpacity } from "react-native-gesture-handler";

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
            address: "",
            avatar: "",
            isLoading: true
        };
    }

    componentDidMount() {
        var that = this;
        f.auth().onAuthStateChanged(function (user) {
            if (user) {                
                that.state.email = f.auth().currentUser.email;
                database.ref('users').child(f.auth().currentUser.uid).once('value', function (snapshot) {
                    if (snapshot.child('firstName').val() != null) {                        
                        that.setState({
                            firstName: snapshot.child('firstName').val()
                        })                        
                    }
                    if (snapshot.child('lastName').val() != null) {
                        that.setState({
                            lastName: snapshot.child('lastName').val()
                        })                        
                    }
                    if (snapshot.child('contact').val() != null) {
                        that.setState({
                            contact: snapshot.child('contact').val()
                        })                        
                    }
                    if (snapshot.child('address').val() != null)  {
                        that.setState({
                            address: snapshot.child('address').val()
                        })                        
                    }
                    if (snapshot.child('avatar').val != null){
                        that.setState({
                            avatar: snapshot.child('avatar').val()
                        })
                    }
                    that.setState({
                        isLoading: false
                    })

                })
            }else{
                that.setState({
                    firstName: 'John',
                    lastName: 'Doe',
                    address: 'Los Angeles',
                    avatar: '../../images/user_image_1.jpg',
                    isLoading: false
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
        //console.log("User hihi!");
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
        var userID = f.auth().currentUser.uid;
        database.ref('/users/' + userID).update({"avatar":imageURL});
        console.log("User: "+user);
        user.updateProfile({
            photoURL: imageURL
        });
        alert('SuccessFully Published!!');
        this.setState({
            imageSelected: false,
            uploading: false,
            progress: 0,
            caption: '',
            avatar: imageURL
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderNavigationBar title={"Profile"} {...this.props} />
                <ScrollView style={{ width: '100%' }}>
                    <View style={styles.container}>
                        <View style={styles.coverImageArea}>
                            <Image style={styles.coverImage} source={require('../../images/cover_photo.jpeg')} />
                        </View>
                        <Avatar
                            onPress={this._handleButtonPress}
                            rounded
                            style={styles.profileImage}
                            source={{
                                uri: this.state.avatar
                            }}
                            showEditButton
                        />
                        {/* <Image style={styles.profileImage} source={require('../../images/user_image_1.jpg')} /> */}
                        <View style={styles.contentArea}>
                            <Text style={styles.nameFont}>{this.state.firstName +" "+ this.state.lastName}</Text>
                            <Text style={styles.cityFont}>{this.state.add}</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 15}}>
                        {this.state.isLoading && (
                            <ActivityIndicator
                                style={{ height: 80 }}
                                color="#C00"
                                size="large"
                            />
                        )}
                        <View>
                            <View style={styles.label}>
                                <Text style={styles.labelText}>First Name</Text>
                            </View>
                        <TextInput
                            placeholder="First Name"
                            placeholderTextColor="rgba(255,255,255,0.8)"
                            style={styles.input}
                            onChangeText={text => this.setState({ firstName: text })}
                            value={this.state.firstName}
                            />
                        </View>
                        <View>
                            <View style={styles.label}>
                                <Text style={styles.labelText}>Last Name</Text>
                            </View>
                        <TextInput
                            placeholder="Last Name"
                            placeholderTextColor="rgba(255,255,255,0.8)"
                            style={styles.input}
                            onChangeText={text => this.setState({ lastName: text })}
                            value={this.state.lastName}
                        />
                        </View>
                        <View>
                            <View style={styles.label}>
                                <Text style={styles.labelText}>Email</Text>
                            </View>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="rgba(255,255,255,0.8)"
                            style={styles.input}
                            onChangeText={text => this.setState({ email: text })}
                            value={this.state.email}
                        />
                        </View>
                        <View>
                            <View style={styles.label}>
                                <Text style={styles.labelText}>Contact Number</Text>
                            </View>
                        <TextInput
                            placeholder="Contact Number"
                            placeholderTextColor="rgba(255,255,255,0.8)"
                            style={styles.input}
                            onChangeText={text => this.setState({ contact: text })}
                            value={this.state.contact}
                        />
                        </View>
                         <View>
                            <View style={styles.label}>
                                <Text style={styles.labelText}>Address</Text>
                            </View>
                        <TextInput
                            placeholder="Address"
                            placeholderTextColor="rgba(255,255,255,0.8)"
                            style={styles.input}
                            onChangeText={text => this.setState({ address: text })}
                            value={this.state.address}
                        />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.signOut} onPress={this.logout}>
                            <Text style={styles.signOutText}>sign Out</Text>
                    </TouchableOpacity>
                    {/* <Button title="Sign Out" onPress={this.logout} /> */}
                    <Button style={styles.saveButton} title="Save" onPress={this.save} />
                </ScrollView>
            </View>
        );
    }

    logout = () => {
        
        this.props.navigation.navigate('Login');
        f.auth().signOut();
        
    }

    save = () => {

        var firstName = this.state.firstName;
        var lastName = this.state.lastName;
        var contact = this.state.contact;
        var address = this.state.address;
        var email = this.state.email;

        let user = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "contact": contact,
            "address": address
        }

        console.log(user)
        f.database()
            .ref('users/')
            .child(f.auth().currentUser.uid)
            .set(user);
    }

}
