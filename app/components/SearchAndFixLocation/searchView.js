import React, { Component } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MAP_API } from "../../../config/config.js";
import styles from "./styles.js";

export default class Search extends Component {
  state = {
    searchFocused: false
  };

  render() {
    const { searchFocused } = this.state;
    const { onLocationSelected } = this.props;

    return (
      <GooglePlacesAutocomplete
        palceholder="Search"
        palceholderTextColor="#333"
        onPress={onLocationSelected}
        query={{
          key: MAP_API,
          language: "en"
        }}
        textInputProps={{
          onFocus: () => {
            this.setState({ searchFocused: true });
          },
          onBlur: () => {
            this.setState({ searchFocused: false });
          },
          autoCapitalize: "none",
          autoCorrect: false
        }}
        listViewDisplayed={searchFocused}
        fetchDetails
        enablePoweredByContainer={false}
        styles={styles}
      />
    );
  }
}
