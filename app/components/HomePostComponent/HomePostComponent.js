import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Share } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";

import style from "./styles";

export default class HomePostComponent extends Component {
  sharePost = () => {
    Share.share(
      {
        message: "Hello, i found an interesting post on Go-Social via the link",
        url: "https://github.com/scorelab/Go-social",
        title: "Go-social ",
      },
      {
        dialogTitle: "Go-social template sharing feature",
        excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"],
      }
    );
  };

  render() {
    return (
      <View style={style.cardView}>
        <View style={style.cardTitleBar}>
          <View style={style.userAvatarArea}>
            <Image
              source={require("../../assets/images/user_image_1.jpg")}
              style={style.userAvatarImage}
            />
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
          <Text style={style.postContentFont}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s
          </Text>
          <View style={style.postImageArea}>
            <Image source={require("../../assets/images/post_01.jpg")} style={style.postImage} />
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          />

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={{ width: 100, height: 30, paddingLeft: 50, marginTop: 10 }}>
              <Icon name="like" size={30} color="blue" />
            </TouchableOpacity>

            <TouchableOpacity style={{ width: 100, height: 30, paddingLeft: 50, marginTop: 10 }}>
              <Icon name="comment" size={30} color="blue" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.sharePost()}
              style={{ width: 100, height: 30, paddingLeft: 50, marginTop: 10 }}>
              <Icon name="share-google" size={30} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
