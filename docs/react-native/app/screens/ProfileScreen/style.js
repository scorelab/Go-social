import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_GRAY } from '../../config/styles';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLOR_GRAY,
    width: '100%',
  },

  coverImageArea: {
    // backgroundColor:'red',
    alignSelf: 'center',
    height: '5%',
    width: 'auto',
    position: 'absolute',
    top: 10,
  },

  coverImage: {
    height: 150,
  },

  profileImage: {
    marginTop: deviceHeight * 0.3 - 80,
    marginRight: deviceWidth * 0.7,
    width: 80,
    height: 80,
    borderRadius: 80,
  },

  contentArea: {
    marginTop: 1,
    alignItems: 'center',
    marginBottom: 50,
  },
  nameFont: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: 'bold',
  },
  cityFont: {
    fontSize: 16,
    lineHeight: 16,
    // fontWeight:'bold'
  },
  input: {
    marginTop: deviceHeight * 0.01,
    marginLeft: deviceWidth * 0.01,
    height: 45,
    width: deviceWidth * 0.98,
    borderRadius: 5,
    backgroundColor: 'rgba(149, 176, 183, 1)',
    marginBottom: 15,
    color: '#FFF',
    paddingHorizontal: 10,
  },
  saveButton: {
    marginTop: 100,
    marginBottom: 100,
    height: 45,
  },
});
