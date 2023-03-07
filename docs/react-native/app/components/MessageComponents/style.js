import { StyleSheet } from 'react-native';
import { COLOR_WHITE } from '../../config/styles';
import { COLOR_PRIMARY } from '../../config/styles';

export default StyleSheet.create({
  cardContainerSender: {
    flex: 1,
    width: 'auto',
    maxWidth: '80%',
    borderRadius: 25,
    height: 'auto',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 10,
    backgroundColor: COLOR_PRIMARY,
    marginHorizontal: 5,
  },
  senderMessage: {
    flex: 0.4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 'auto',
    maxWidth: '80%',
    paddingVertical: 2,
    paddingHorizontal: 10,
    alignItems: 'flex-end',
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 25,
  },
  senderMessageText: {
    fontSize: 14,
    color: '#fff',
    paddingVertical: 5,
  },
  senderTimePosted: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
  },
  senderTimePostedText: {
    fontSize: 12,
    color: COLOR_WHITE,
  },

  cardContainerReceiver: {
    flex: 1,
    width: 'auto',
    maxWidth: '80%',
    borderRadius: 25,
    height: 'auto',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
    backgroundColor: COLOR_WHITE,
    marginHorizontal: 5,
  },
  receiverMessage: {
    flex: 0.4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 'auto',
    maxWidth: '80%',
    paddingVertical: 2,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    backgroundColor: COLOR_WHITE,
    borderRadius: 25,
  },
  receiverMessageText: {
    fontSize: 14,
    color: '#000',
    paddingVertical: 5,
  },
  receiverTimePosted: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
  },
  receiverTimePostedText: {
    fontSize: 12,
    color: '#000',
  },
});
