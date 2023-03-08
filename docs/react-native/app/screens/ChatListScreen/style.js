import { StyleSheet, Dimensions } from "react-native";
import { COLOR_GRAY } from "../../config/styles";
let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  suggestUserArea: {
    width: "100%",
  },
  userCardView: {
    backgroundColor: "blue",
    width: deviceWidth * 0.25,
    height: deviceWidth * 0.3,
    marginLeft: 10,
    marginRight: 10,
  },
  latestMessageArea: {
    marginTop: 10,
    // backgroundColor:'red',
    width: "100%",
    alignItems: "center",
  },
  subHeaderArea: {
    width: "90%",
    marginBottom: 10,
  },
  horizontalScrollView: {
    paddingLeft: 10,
  },

  button: {
    marginTop: 40,
  },
  imgBackground: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "transparent",
    position: "absolute",
  },
  scrollView: {
    width: "100%",
    backgroundColor: COLOR_GRAY,
  },
  scrollViewContent: {
    alignItems: "center",
  },

  //Text-------
  subHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4e5861",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
