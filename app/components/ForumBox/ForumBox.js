import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import styles from './styles';

export default class ForumBox extends React.Component {
	render() {
		return (
			<View style={{marginTop: 15}}>
				<View style = {styles.QuestionStyle}>
					<View style={styles.nameHeadlineStyle}>
						<Text style={{marginLeft: 10}}>{this.props.Question}</Text>
					</View>
					<View style={{backgroundColor:'white', borderRadius:10}}>
						<TextInput style={{padding: 10, fontSize: 13, width: "90%", height: 80 }} multiline  placeholder = "Ask your query, by addressing your problem clearly!" />
					</View>
				</View>
			</View>
		);
	}
}
