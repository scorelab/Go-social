import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY } from '../../config/styles' ;

export default StyleSheet.create({
navigationBar: {
    backgroundColor: COLOR_PRIMARY,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
},
leftIconContainer: {
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 5
},
navBarIcon: {
    width: 32,
    height: 32
}

});