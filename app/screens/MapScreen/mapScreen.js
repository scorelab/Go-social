import React, { Component, Fragment } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import HeaderNavigationBar from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from "react-native-maps";
import styles from "./style";
import Search from "../../components/SearchAndFixLocation/searchView.js";
import { Card } from "react-native-elements";

let id = 0;
const DISTANCE = 0.01;

export default class MapScreen extends Component {
  state = {
    region: null,
    destination: null,
    search: false,
    surface: false,
    multiplePoints: false,
    markers: [],
    polygons: [],
    editing: null,
    // draggableRegion: null
  };

  onPress(e) {
    const { editing, creatingHole } = this.state;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
          holes: [],
        },
      });
    } else if (!creatingHole) {
      this.setState({
        editing: {
          ...editing,
          coordinates: [...editing.coordinates, e.nativeEvent.coordinate],
        },
      });
    } else {
      const holes = [...editing.holes];
      holes[holes.length - 1] = [...holes[holes.length - 1], e.nativeEvent.coordinate];
      this.setState({
        editing: {
          ...editing,
          id: id++, // keep incrementing id to trigger display refresh
          coordinates: [...editing.coordinates],
          holes,
        },
      });
    }
  }

  onMapPress = e => {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: `foo${id++}`,
        },
      ],
    });
  };

  async componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          this.setState({
            region: {
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
          });
        },
        error => {
          console.log(error);
        },
        {
          timeout: 2000,
          enableHighAccuracy: true,
          maximumAge: 10000,
        }
      );
    } else {
      console.log("The user's device does not support geolocation");
    }
  }

  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude },
    } = geometry;
    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text,
      },
    });
  };

  updateSearchState = () => {
    this.setState({
      search: true,
      surface: false,
      multiplePoints: false,
    });
  };

  updateMultiplePoints = () => {
    this.setState({
      search: false,
      surface: false,
      multiplePoints: true,
    });
  };

  updateSurfaceArea = () => {
    this.setState({
      search: false,
      surface: true,
      multiplePoints: false,
    });
  };

  render() {
    const { region, destination, search, surface, multiplePoints } = this.state;

    const mapOptions = {
      scrollEnabled: true,
    };

    if (this.state.editing) {
      mapOptions.scrollEnabled = false;
      mapOptions.onPanDrag = e => this.onPress(e);
    }
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          showsUserLocation
          loadingEnabled
          onPress={surface ? e => this.onPress(e) : multiplePoints ? this.onMapPress : null}>
          {/* <Marker
            coordinate={this.state.draggableRegion}
            title="key"
            key="key"
            onDragEnd={e => console.log(e.nativeEvent.coordinate)}
            draggable
          /> */}
          {multiplePoints &&
            this.state.markers.map(marker => (
              <Marker coordinate={marker.coordinate} title={marker.key} key={marker.key} />
            ))}
          {destination && (
            <Fragment>
              <Marker coordinate={destination} />
            </Fragment>
          )}

          {surface &&
            this.state.polygons.map(polygon => (
              <Polygon
                key={polygon.id}
                coordinates={polygon.coordinates}
                holes={polygon.holes}
                strokeColor="#F00"
                fillColor="rgba(255,0,0,0.5)"
                strokeWidth={1}
              />
            ))}

          {surface && this.state.editing && (
            <Polygon
              key={this.state.editing.id}
              coordinates={this.state.editing.coordinates}
              holes={this.state.editing.holes}
              strokeColor="#000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          )}
        </MapView>
        <HeaderNavigationBar title={"Locations"} {...this.props} />
        {search && <Search onLocationSelected={this.handleLocationSelected} />}

        <Card title="OPTIONS" containerStyle={styles.cardStyle}>
          <View style={styles.rowElements}>
            <TouchableOpacity
              style={styles.touchableOpacityFilter}
              onPress={this.updateSearchState}>
              <Text style={styles.touchableText}>Fixed Point</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.touchableOpacityFilter}
              onPress={this.updateMultiplePoints}>
              <Text style={styles.touchableText}>Multiple Points</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.touchableOpacityFilter}
              onPress={this.updateSurfaceArea}>
              <Text style={styles.touchableText}>Surface Area</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  }
}
