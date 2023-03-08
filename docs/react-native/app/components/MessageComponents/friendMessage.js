import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./style";

export default class friendMessage extends Component {
  render() {
    return (
      <View style={styles.cardContainerReceiver}>
        <View style={styles.receiverMessage}>
          <Text style={styles.receiverMessageText}>{this.props.message}</Text>
        </View>
        <View style={styles.receiverTimePosted}>
          <Text style={styles.receiverTimePostedText}>{this.props.posted}</Text>
        </View>
      </View>
    );
  }
}
