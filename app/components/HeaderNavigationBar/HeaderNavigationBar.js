import React, { Component } from "react";
import { Text, View, TouchableHighlight, Image } from "react-native";
import styles from './styles'

export default class HeaderNavigationBar extends Component {
    render() {
        return (
        <View style={styles.navigationBar}>
            <TouchableHighlight style={styles.leftIconContainer}
                onPress={() => { this.props.navigation.openDrawer() }}>
                <Image
                    style={styles.navBarIcon}
                    source={require("../../icons/menu-icon.png")}
                />
            </TouchableHighlight>
        </View>);
    }
}