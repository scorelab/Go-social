import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_GRAY } from '../../config/styles' ;

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    scrollView:{
        width:deviceWidth,
        backgroundColor: COLOR_GRAY,
            
    },
    scrollViewContent:{
        alignItems:'center',
        paddingBottom:10
    },
   
});