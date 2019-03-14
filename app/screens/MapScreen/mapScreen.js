import React, { Component, Fragment } from "react";
import { Text, View, TouchableHighlight, Image } from "react-native";
import HeaderNavigationBar from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import styles from "./style";
import Search from "./Search/searchView.js";
import Directions from "./Directions/directions.js";
import markerImage from "./assets/icon.png";
import { getPixelSize } from "./util.js";

export default class MapScreen extends Component {
  state = {
    region: null,
    destination: null
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
      (error) => {
        console.log(error);
      }, //error
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 10000
      }
    );
  }

  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;
    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      }
    });
  };

  render() {
    const { region, destination } = this.state;

    console.log(region);
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          showsUserLocation
          loadingEnabled
          ref={el => (this.mapView = el)}
        >
          {destination && (
            <Fragment>
              <Directions
                origin={region}
                destination={destination}
                onReady={result => {
                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(50)
                    }
                  });
                }}
              />
              <Marker
                coordinate={destination}
                anchor={{ x: 0, y: 0 }}
                image={markerImage}
              />
            </Fragment>
          )}
        </MapView>
        <HeaderNavigationBar title={"Locations"} {...this.props} />
        <Search onLocationSelected={this.handleLocationSelected} />
      </View>
    );
  }
}
