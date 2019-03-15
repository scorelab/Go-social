import React from "react";
import MapViewDirections from "react-native-maps-directions";
import { MAP_API } from "../../../../config/config.js";

const Directions = ( { destination, origin, onReady } ) => (
    <MapViewDirections
        destination = { destination }
        origin = { origin }
        onReady = { onReady }
        apikey = { MAP_API }
        strokeWidth = { 4 }
        strokeColor = "#1123F2"
    />
);

export default Directions;