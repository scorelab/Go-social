import React, { Component } from "react";
import { Text, View, TouchableHighlight, Image} from "react-native";
import { Info } from "..";
import HeaderNavigationBar from "../../components/HeaderNavigationBar/HeaderNavigationBar";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import styles from './style';
const backgroundColor = '#007256';

export default class MapScreen extends Component {

    render() {
        return (
        <View style ={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: 6.926267, 
                    longitude: 79.876780,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
            </MapView>
        </View>);
    }
}
