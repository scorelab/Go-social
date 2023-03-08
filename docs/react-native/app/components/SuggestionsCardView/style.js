import { StyleSheet, Dimensions } from "react-native";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    width: deviceWidth * 0.25,
    height: deviceWidth * 0.3,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginBottom: 5,
    alignSelf: "center",
  },
  detailRow: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    marginTop: 10,
  },
  thumbnailRow: {
    flex: 1,
    width: "100%",
    // backgroundColor:'red',
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
  },

  //Font styles

  nameText: {
    fontSize: 14,
    color: "#4e5861",
    fontWeight: "bold",
    textAlign: "center",
  },
  meaasageText: {
    fontSize: 16,
    color: "#95a3ad",
  },
  paraText: {
    fontSize: 16,
    color: "#555f68",
  },
});
