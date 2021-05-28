import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

export default class HeaderBar extends React.Component {
	render() {
		return(
			<View style={{marginBottom: 15}}>
				<View style={styles.HeaderStyle1}>
					<Image source={this.props.image} style={styles.ImageView} />
					<Text style={styles.HeaderStyle}>{this.props.title}</Text>
				</View>
				<View style={styles.DividerView} />
				<View style={styles.DividerView} />
			</View>
		);
	}
}