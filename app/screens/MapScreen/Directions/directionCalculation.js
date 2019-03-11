import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ( { destination, origin, onReady } ) => (
    <MapViewDirections
        destination = { destination }
        origin = { origin }
        onReady = { onReady }
        apikey = "AIzaSyDmwJddIPTcALyZtj7p9mFFlkMvpMkati8"
        strokeWidth = { 3 }
        strokeColor = "#222"
    />
);

export default Directions;