import React, { Component } from "react";
import { Text, View, TextInput, ScrollView, Image, Button, AsyncStorage } from "react-native";
import { Info, DeatilView } from "..";
import HeaderNavigationBar from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import styles from './style'
import { f, auth, database } from "../../../config/config.js";

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

                })
            }
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
                        <Image style={styles.profileImage} source={require('../../images/user_image_1.jpg')} />
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
                            value={this.state.firstName}
                        />
                        <TextInput
                            placeholder="Last Name"
                            placeholderTextColor="rgba(255,255,255,0.8)"
                            style={styles.input}
                            onChangeText={text => this.setState({ lastName: text })}
                            value={this.state.lastName}
                        />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="rgba(255,255,255,0.8)"
                            style={styles.input}
                            onChangeText={text => this.setState({ email: text })}
                            value={this.state.email}
                        />
                        <TextInput
                            placeholder="Contact Number"
                            placeholderTextColor="rgba(255,255,255,0.8)"
                            style={styles.input}
                            onChangeText={text => this.setState({ contact: text })}
                            value={this.state.contact}
                        />
                        <TextInput
                            placeholder="Address"
                            placeholderTextColor="rgba(255,255,255,0.8)"
                            style={styles.input}
                            onChangeText={text => this.setState({ address: text })}
                            value={this.state.address}
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
