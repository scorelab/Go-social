import React, { Component } from "react";
import { Text, View, TouchableHighlight, Image, Button, AsyncStorage} from "react-native";
import { Info, DeatilView } from "..";
import HeaderNavigationBar from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import styles from './style'


export default class ProfileScreen extends Component {

    render() {
        return (   
            <View style={styles.container}>
                
                <View style={styles.coverImageArea}>
                    <HeaderNavigationBar title={"Profile"} {...this.props} /> 
                    <Image source={require('../../images/cover_photo.jpeg')} />
                </View>
                <Image style={styles.profileImage} source={require('../../images/user_image_1.jpg')} />
                <View style={styles.contentArea}>
                    <Text style={styles.nameFont}>John Doe</Text>
                    <Text style={styles.cityFont}>Los Angeles</Text>
                </View>
                <Button title="Sign Out" onPress={this._signOutAsync} />
            </View>
        );
    }
    _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}
