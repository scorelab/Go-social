import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './style';

export default class myMessage extends Component {
  render() {
    return (
      <View style={styles.cardContainerSender}>
        <View style={styles.senderMessage}>
          <Text style={styles.senderMessageText}>{this.props.message}</Text>
        </View>
        <View style={styles.senderTimePosted}>
          <Text style={styles.senderTimePostedText}>{this.props.posted}</Text>
        </View>
      </View>
    );
  }
}
