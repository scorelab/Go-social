import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style";

export default class CardView extends Component {
  render() {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardHedear}>
          <View style={styles.profilePicArea}>
            <Image style={styles.userImage} source={this.props.image} />
          </View>
          <View style={styles.userDetailArea}>
            <View style={styles.meaasageRow}>
              <Text style={styles.meaasageText}>{this.props.text}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
