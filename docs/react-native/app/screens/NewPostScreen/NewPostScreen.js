import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { DetailView, Info } from '..';
import ModalHeaderNavigationBar from '../../components/ModalHeaderNavigationBar/modalHeaderNavigationBar';
import styles from './style';
import { Card, ListItem, Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { f, auth, storage, database } from '../../../config/config.js';
export default class NewPostScreen extends Component {
  constructor() {
    super();
    this.state = {
      imageSelected: false,
      pickedImage: null,
      progress: 0,
      caption: '',
      uploading: false,
      postId: this.uniqueId(),
    };
  }
  componentDidMount = () => {
    this.equestCameraPermission();
  };
  equestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Go Social Camera Permission',
        message: 'Go Social App needs access to your camera ' + 'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  _handleButtonPress = () => {
    ImagePicker.showImagePicker({ title: 'Pick an Image', maxWidth: 800, maxHeight: 600 }, res => {
      if (res.didCancel) {
        console.log('User cancelled!');
      } else if (res.error) {
        console.log('Error', res.error);
      } else {
        this.setState({
          pickedImage: res.uri,
          imageSelected: true,
        });
      }
    });
  };
  reset = () => {
    this.setState({
      pickedImage: null,
      imageSelected: false,
    });
  };

  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  uniqueId = () => {
    return (
      this.s4() +
      this.s4() +
      '-' +
      this.s4() +
      '-' +
      this.s4() +
      '-' +
      this.s4() +
      '-' +
      this.s4() +
      '-' +
      this.s4() +
      '-' +
      this.s4()
    );
  };

  uploadImage = async () => {
    var uri = this.state.pickedImage;
    var that = this;
    var postId = this.state.postId;
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(uri)[1];

    this.setState({
      currentFileType: ext,
      uploading: true,
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
    var filePath = postId + '.' + that.state.currentFileType;

    var uploadTask = storage.ref('post/img').child(filePath).put(blob);

    uploadTask.on(
      'state_changed',
      function (snapshot) {
        let progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
        that.setState({
          progress: progress,
        });
      },
      function (error) {
        console.log(error);
      },
      function () {
        that.setState({
          progress: 100,
        });
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          that.setDatabse(downloadURL);
        });
      }
    );
  };

  setDatabse = imageURL => {
    var date = Date.now();
    var postId = this.state.postId;
    var userID = auth.currentUser.uid;
    var posted = Math.floor(date / 1000);
    const postObj = {
      caption: this.state.caption,
      userId: userID,
      image: imageURL,
      posted: posted,
    };
    database.ref('/post/' + postId).set(postObj);
    alert('SuccessFully Published!!');
    this.setState({
      imageSelected: false,
      uploading: false,
      progress: 0,
      caption: '',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ModalHeaderNavigationBar
          onPress={() => this.props.navigation.goBack()}
          title={'New Post'}
        />
        {this.state.uploading == true ? (
          <View style={styles.progresView}>
            <Text style={styles.progressText}>{this.state.progress}%</Text>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.progressText}>Publishing ...</Text>
          </View>
        ) : (
          <View>
            <View style={styles.row}>
              <Image
                style={styles.profileImage}
                source={require('../../images/user_image_1.jpg')}
              />
              <Text style={styles.nameText}>John Doe</Text>
              {this.state.imageSelected == true && this.state.caption != '' ? (
                <View style={styles.shareView}>
                  <Button
                    icon={<Icon name="arrow-right" size={15} color="white" />}
                    onPress={this.uploadImage}
                    title="Share"
                  />
                </View>
              ) : (
                <View></View>
              )}
            </View>
            <View style={styles.selectedImageView}>
              {this.state.imageSelected == true ? (
                <View>
                  <Image source={{ uri: this.state.pickedImage }} style={styles.selectedImage} />
                  <TouchableOpacity onPress={this.reset}>
                    <Text style={styles.reset}>Reset Image</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View></View>
              )}
            </View>
            <TextInput
              style={styles.text}
              placeholder={'What is on your mind?'}
              editable={true}
              multiline={true}
              onChangeText={text => this.setState({ caption: text })}
              ref={input => {
                this.textInput = input;
              }}></TextInput>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}>
              {this.state.imageSelected == true ? (
                <TouchableOpacity style={styles.list} onPress={this._handleButtonPress}>
                  <ListItem title={'Change Photo'} leftIcon={{ name: 'edit' }} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.list} onPress={this._handleButtonPress}>
                  <ListItem title={'Add Photo'} leftIcon={{ name: 'photo' }} />
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.list}>
                <ListItem title={'Tag People'} leftIcon={{ name: 'people' }} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}
