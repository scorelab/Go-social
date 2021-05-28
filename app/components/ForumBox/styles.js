import { StyleSheet, Dimensions } from "react-native";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
	QuestionStyle : {
		width : "90%",
		borderRadius: 10,
		borderWidth: 1,
		backgroundColor: Platform.OS === "ios" ? "#fff" : null,
		borderColor: "#b8b8b8",
		shadowColor: Platform.OS === "ios" ? "#000000" : "#000000",
		shadowOffset: {
			width: Platform.OS === "ios" ? 0 : 0,
			height: Platform.OS === "ios" ? 2 : 2,
		},
		shadowOpacity: Platform.OS === "ios" ? 0.9 : 0.8,
		shadowRadius: Platform.OS === "ios" ? 3 : 40,
		elevation: Platform.OS === "ios" ? 3 : 4,
		alignSelf: "center"
	},
	nameHeadlineStyle : {
		width: "101%",
		height : 25,
		backgroundColor: "#79AEE0",
		borderRadius: 7,
		alignSelf: "center",
		justifyContent: "center",
		top: 0
	},
	AnswerButtonStyle : {
		width: 65,
		height: 23,
		backgroundColor: "#9cd683",
		borderRadius: 5,
		alignSelf: "flex-end",
		bottom: 5,
		right: 5,
		justifyContent: "center",
	},
});