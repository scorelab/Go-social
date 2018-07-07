import React, { Component } from "react";
import { ScrollView, Text, View, TouchableHighlight, Image} from "react-native";
import { DetailView, Info } from "..";
import HeaderNavigationBar from '../../components/HeaderNavigationBar/HeaderNavigationBar';
import HomePostComponent from '../../components/HomePostComponent/HomePostComponent';

const backgroundColor = '#ffffff';
export default class HomeScreen extends Component {

    render() {
        return (<View style={{
            flex: 1,
            flexDirection: 'column',
        }}>      
            <HeaderNavigationBar {...this.props} />      
            <ScrollView contentContainerStyle={{
                backgroundColor: backgroundColor,
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}> 
                <HomePostComponent/>
                <HomePostComponent/>
                <HomePostComponent/>
                
                <TouchableHighlight style={{ 
                                            margin: 20, 
                                            width: 200, 
                                            height: 45,
                                            backgroundColor: 'darkviolet',
                                            padding: 10,
                                            alignItems: 'center',
                                         }}
                    onPress={() => {this.props.navigation.navigate('DetailView');                                             
                    }}>
                    <Text style={{color: 'white', fontSize: 18}}>DetailView</Text>
                </TouchableHighlight>
            </ScrollView>
        </View>);
    }
}
