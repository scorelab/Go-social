import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_GRAY } from '../../config/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    backgroundColor: COLOR_GRAY,
  },
  scrollViewContent: {
    paddingBottom: 10,
  },
  messageArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 120,
    height: 'auto',
  },
  messageInput: {
    borderRadius: 5,
    borderColor: COLOR_GRAY,
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 5,
    width: '80%',
    maxHeight: 120,
    height: 'auto',
  },
  sendArea: {
    alignSelf: 'center',
    marginHorizontal: 'auto',
    width: 90,
    borderRadius: 5,
    width: '10%',
  },
});
