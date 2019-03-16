import React, { Component, Fragment } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import HeaderNavigationBar from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from "react-native-maps";
import styles from "./style";
import Search from "../../components/SearchAndFixLocation/searchView.js";

let id = 0;
export default class MapScreen extends Component {
  state = {
    region: null,
    destination: null,
    search: false,
    draggable: false,
    surface: false,
    multiplePoints: false,
    markers: [],
    polygons: [],
    editing: null,
    creatingHole: false
  };


  onPress(e) {
    const { editing, creatingHole } = this.state;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
          holes: []
        }
      });
    } else if (!creatingHole) {
      this.setState({
        editing: {
          ...editing,
          coordinates: [...editing.coordinates, e.nativeEvent.coordinate]
        }
      });
    } else {
      const holes = [...editing.holes];
      holes[holes.length - 1] = [
        ...holes[holes.length - 1],
        e.nativeEvent.coordinate
      ];
      this.setState({
        editing: {
          ...editing,
          id: id++, // keep incrementing id to trigger display refresh
          coordinates: [...editing.coordinates],
          holes
        }
      });
    }
  }

  onMapPress = (e) => {
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

  updateSearchState = () => {
    this.setState({
      search: true,
      surface: false,
      multiplePoints: false,
      draggable: false
    });
  };

  updateMultiplePoints = () => {
    this.setState({
      search: false,
      surface: false,
      multiplePoints: true,
      draggable: false
    });
  };

  updateSurfaceArea = () => {
    this.setState({
      search: false,
      surface: true,
      multiplePoints: false,
      draggable: false
    });
  };

  updateDraggableState = () => {
    console.log(this.state.markers);
    // this.setState({
    //   search: false,
    //   surface: false,
    //   multiplePoints: false,
    //   draggable: true
    // });
  };

  render() {
    const {
      region,
      destination,
      search,
      surface,
      multiplePoints,
      draggable
    } = this.state;

    const mapOptions = {
      scrollEnabled: true
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
          region={region}
          showsUserLocation
          loadingEnabled
          onPress={
            surface ? e => this.onPress(e) : multiplePoints ? this.onMapPress : null
          }
        >
          {multiplePoints &&
            this.state.markers.map(marker => (
              <Marker
                coordinate={marker.coordinate}
                title={marker.key}
                key={marker.key}
              />
            ))}
          {destination && (
            <Fragment>
              <Marker coordinate={destination} />
            </Fragment>
          )}

          {draggable &&
            (console.log("draggable"),
            (
              <Marker
                coordinate={this.state.destination}
                onSelect={e => log("onSelect", e)}
                onDrag={e => log("onDrag", e)}
                onDragStart={e => log("onDragStart", e)}
                onDragEnd={e => log("onDragEnd", e)}
                onPress={e => log("onPress", e)}
                draggable
              />
            ))}

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

        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginTop: "auto"
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#4885ed",
              padding: 10,
              margin: 10
            }}
            onPress={this.updateSearchState}
          >
            <Text>Fixed Point</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#4885ed",
              padding: 10,
              margin: 10
            }}
            onPress={this.updateMultiplePoints}
          >
            <Text>Multiple Points</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#4885ed",
              margin: 10,
              padding: 10
            }}
            onPress={this.updateSurfaceArea}
          >
            <Text>Surface Area</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#4885ed",
              margin: 10,
              padding: 10
            }}
            onPress={this.updateDraggableState}
          >
            <Text>Draggable</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
