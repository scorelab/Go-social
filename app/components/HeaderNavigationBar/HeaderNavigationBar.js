import React, { Component } from "react";
import { Text, View, TouchableHighlight, Image } from "react-native";

export default class HeaderNavigationBar extends Component {
    render() {
        return (<View style={{
            height: 55,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <TouchableHighlight style={{ marginLeft: 10, marginTop: 10 }}
                onPress={() => { this.props.navigation.openDrawer() }}>
                <Image
                    style={{ width: 32, height: 32 }}
                    source={require("../../icons/menu-icon.png")}
                />
            </TouchableHighlight>
        </View>);
    }
}