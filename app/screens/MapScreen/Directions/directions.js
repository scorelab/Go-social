import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ( { destination, origin, onReady } ) => (
    <MapViewDirections
        destination = { destination }
        origin = { origin }
        onReady = { onReady }
        apikey = "AIzaSyC0v-VrgobBgboTBqQo60X_hp50BIYRTEQ"
        strokeWidth = { 4 }
        strokeColor = "#1123F2"
    />
);

export default Directions;