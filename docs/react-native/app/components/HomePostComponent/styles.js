import { StyleSheet, Dimensions } from "react-native";
import { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_LIGHT } from "../../config/styles";

var {height, width} = Dimensions.get("window");

let cardViewHeight = height * 0.7;
let cardViewWidth = width * 0.9;
let cardTitleBarHeight = height * 0.1;
let userAvatarImageHeight = height * 0.1;
let userAvatarImageWidth = height * 0.1;
let cardNameLineHeight = cardTitleBarHeight * 0.3; 

export default StyleSheet.create({
cardView: {
    backgroundColor: COLOR_LIGHT,
    maxHeight: cardViewHeight,
    width: cardViewWidth,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom:15,
    marginTop:10,
    borderRadius:5,
    padding:10

},
cardTitleBar: {
    // backgroundColor: COLOR_LIGHT,
    height: cardTitleBarHeight,
    width: cardViewWidth,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom:5,
    paddingLeft:10,
    // borderRadius:5,

},
userAvatarArea: {
    // backgroundColor: COLOR_LIGHT,
    height: userAvatarImageHeight,
    width: userAvatarImageWidth
},
userAvatarImage: {
    height: userAvatarImageHeight,
    width: userAvatarImageWidth,
    borderRadius: userAvatarImageHeight
},
cardTitleArea: {
    flexDirection:"column",
    marginLeft: 10,
    marginRight:10
},
nameLine: {
    marginTop:10,
    height: cardNameLineHeight,

},
dateTimeLine: {
    backgroundColor: COLOR_LIGHT
},
cardViewBody: {
    backgroundColor: COLOR_LIGHT,
    paddingLeft:10,
    paddingRight:10
    // marginRight:10
},
postImageArea: {
    width:cardViewWidth-20,
    marginTop: 5,
    
},
postImage: {
    width:cardViewWidth-20,
    height:220,
    resizeMode:"center"
},

// Font Styles
nameFont: {
    fontSize:16,
    lineHeight:16,
    fontWeight:"bold"
},
postContentFont: {
    textAlign:"justify"
}

});