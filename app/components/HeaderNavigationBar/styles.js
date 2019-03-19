import { StyleSheet, Dimensions } from "react-native";
import { COLOR_PRIMARY } from "../../config/styles" ;

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
navigationBar: {
    backgroundColor: COLOR_PRIMARY,
    height: 55,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width:"100%"
},
leftIconContainer: {
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 5
},
rightIconContainer: {
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 5
},
titleArea:{
    width:deviceWidth*0.5,
    alignItems:"center"
},

//Text

titleFont:{
    fontSize:18,
    color:"white"
}



});