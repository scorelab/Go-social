import React, { Component } from "react";
import { View } from "react-native";
import HeaderNavigationBar from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import styles from "./style";

export default class MapScreen extends Component {
  state = {
    region: null,
    draggableRegion: null,
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          draggableRegion: {
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        });
      }, //success
      error => {
        console.log(error);
      }, //error
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 10000,
      }
    );
  }

  render() {
    const { region } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          showsUserLocation
          loadingEnabled>
          <Marker
            coordinate={this.state.draggableRegion}
            title="key"
            key="key"
            onDragEnd={e => console.log(e.nativeEvent.coordinate)}
            draggable
          />
        </MapView>
        <HeaderNavigationBar title={"Locations"} {...this.props} />
      </View>
    );
  }
}
