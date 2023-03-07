import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_GRAY } from '../../config/styles';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  scrollView: {
    width: deviceWidth,
    backgroundColor: COLOR_GRAY,
    marginTop: 15,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 10,
  },
});
