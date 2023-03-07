import { StyleSheet, Dimensions } from 'react-native';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  HeaderStyle: {
    fontSize: 30,
    flex: 1,
    marginLeft: 10,
    marginTop: 5,
  },
  ImageView: {
    width: 55,
    height: 55,
    marginHorizontal: 5,
  },
  HeaderStyle1: {
    flexDirection: 'row',
  },
  DividerView: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 3,
    marginHorizontal: 10,
  },
});
