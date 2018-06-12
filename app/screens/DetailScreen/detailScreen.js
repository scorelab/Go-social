import React, { Component } from "react";
import { Text, View, TouchableHighlight, Image} from "react-native";
import { Info } from "..";
import HeaderNavigationBar from "../../components/HeaderNavigationBar/HeaderNavigationBar";

const backgroundColor = '#4775ad';
export default class DetailScreen extends Component {

    render() {
        return (<View style={{
            flex: 1,
            flexDirection: 'column',
        }}>      
            <HeaderNavigationBar {...this.props} />      
            <View style={{
                flex: 1,
                backgroundColor: backgroundColor,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
                    This is Detail Screen
                </Text>
                <TouchableHighlight style={{ 
                                            margin: 20, 
                                            width: 200, 
                                            height: 45,
                                            backgroundColor: 'darkviolet',
                                            padding: 10,
                                            alignItems: 'center',
                                         }}
                    onPress={() => {
                        this.props.navigation.goBack();                                          
                    }}>
                    <Text style={{color: 'white', fontSize: 18}}>Navigate Back</Text>
                </TouchableHighlight>
            </View>
        </View>);
    }
}
