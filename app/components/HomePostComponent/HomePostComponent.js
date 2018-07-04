import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import style from './styles';

export default class HomePostComponent extends Component {
    
    render(){
        return(
            <View style={style.cardView}>
                <View style={style.cardTitleBar}>
                    <View style={style.userAvatarArea}>
                        <Image source={require('../../images/user_01.png')} style={style.userAvatarImage}/>
                    </View>
                    <View style={style.cardTitleArea}>
                        <View style={style.nameLine}>
                            <Text style={style.nameFont}>John Doe</Text>
                        </View>
                        <View style={style.dateTimeLine}>
                            <Text>8:00 AM | 01 Jun 2018</Text>
                        </View>
                        
                    </View>                        
                </View>
                <View style={style.cardViewBody}>
                    <Text style={style.postContentFont}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
                    <View style={style.postImageArea}>
                        <Image source={require('../../images/post_01.jpg')} style={style.postImage}/>
                    </View>
                </View>
                
            </View>
        );
    }
}