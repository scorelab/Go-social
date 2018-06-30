import React, { Component } from "react";
import { Text, View, TouchableHighlight, Image, Button, AsyncStorage} from "react-native";
import { Info, DeatilView } from "..";
import HeaderNavigationBar from "../../components/HeaderNavigationBar/HeaderNavigationBar";

const backgroundColor = '#4734ac';

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

                <Button title="Sign me out :)" onPress={this._signOutAsync} />
            </View>
        </View>);
    }
    _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}
