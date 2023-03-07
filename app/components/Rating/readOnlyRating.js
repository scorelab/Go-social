import React, { Component } from 'react';
import { View } from 'react-native';
import { Rating } from 'react-native-elements';
export default class readOnlyRating extends Component {
  render() {
    return (
      <View>
        <Rating imageSize={this.props.size} readonly startingValue={this.props.rating} />
      </View>
    );
  }
}
