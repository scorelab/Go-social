import { StyleSheet, Dimensions } from "react-native";
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  mapArea: {
    // ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: deviceHeight * 0.5
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
 
});
