import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/FontAwesome";
export default class modalHeaderNavigationBar extends Component {
  render() {
    return (
      <View style={styles.navigationBar}>
        <View style={styles.goBackArea}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Ionicons name={"arrow-circle-left"} size={25} color={"white"} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleArea}>
          <Text style={styles.titleFont}>{this.props.title}</Text>
        </View>
        <View style={styles.goBackArea}>
          <Text style={styles.titleFont}> </Text>
        </View>
      </View>
    );
  }
}
