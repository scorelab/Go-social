import React, { Component } from "react";
import { Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";

export default class HeaderNavigationBar extends Component {
    render() {
        return (
        <View style={styles.navigationBar}>
            <View style={styles.titleArea}><Text style={styles.titleFont}>{this.props.title}</Text></View>
        </View>);
    }
}