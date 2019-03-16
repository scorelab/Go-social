import React, { Component, Fragment } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import HeaderNavigationBar from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import styles from "./style";

let id = 0;
export default class MultipleMarkerPoints extends Component {
  state = {
    region: null,
    destination: null,
    markers: []
  };

  onMapPress = e => {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: `foo${id++}`
        }
      ]
    });
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }
        });
      }, //success
      error => {
        console.log(error);
      }, //error
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 10000
      }
    );
  }

  render() {
    const { region, destination, multiplePoints } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          showsUserLocation
          loadingEnabled
          onPress={this.onMapPress}
        >
          { this.state.markers.map(marker => (
              <Marker
                coordinate={marker.coordinate}
                title={marker.key}
                key={marker.key}
              />
            ))}
        </MapView>
        <HeaderNavigationBar title={"Locations"} {...this.props} />
      </View>
    );
  }
}
