import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_GRAY } from '../../config/styles';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollView: {
    width: deviceWidth,
    backgroundColor: COLOR_GRAY,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  text: {
    height: 30,
    width: deviceWidth * 0.8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#b2beb5',
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginVertical: 10,
    color: '#000',
    paddingHorizontal: 10,
    fontSize: 16,
    textAlignVertical: 'center',
  },
  postButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
  },
});
