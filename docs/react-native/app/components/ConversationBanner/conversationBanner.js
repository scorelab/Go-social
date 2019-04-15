import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style";

export default class CardView extends Component {

    state = {
        isLiked: false,
        likeCount: this.props.likeCount
    }
    clickOnLikeButton(count) {

        this.setState({
            isLiked: !this.state.isLiked,
            likeCount: this.state.likeCount + count
        })
    }
    render() {
        return (
            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.cardHedear} onPress={this.props.onPress}>
                    <View style={styles.profilePicArea}>
                        <Image style={styles.userImage} source={this.props.userImage} />
                        {this.props.count > 0 &&
                            <View style={styles.badgeCount}>
                                <Text style={styles.countText}>{this.props.count}</Text>
                            </View>
                        }
                    </View>
                    <View style={styles.userDetailArea}>
                        <View style={styles.userNameRow}>
                            <Text style={styles.nameText}>{this.props.name}</Text>
                            <Text style={styles.nameText}>{this.props.posted}</Text>                            
                        </View>                        
                        <View style={styles.meaasageRow}><Text numberOfLines={2} style={styles.meaasageText}>{this.props.message}</Text></View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}