import React, { Component } from 'react';
import { View } from 'react-native';
import { Rating } from 'react-native-elements';
export default class rating extends Component {
  render() {
    return (
      <View>
        <Rating
          showRating
          fractions={this.props.fractions}
          startingValue={this.props.startingValue}
          onFinishRating={this.props.finishRatingFunction}
        />
      </View>
    );
  }
}
