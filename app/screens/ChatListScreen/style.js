import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_GRAY } from '../../config/styles' ;
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    suggestUserArea:{
        width:deviceWidth,
    },
    userCardView:{
        backgroundColor:'blue',
        width: deviceWidth * 0.25,
        height: deviceWidth * 0.3,
        marginLeft:10,
        marginRight:10
    },
    latesMessageArea:{
        marginTop:10,
        // backgroundColor:'red',
        width:deviceWidth,
        alignItems:'center'
    },
    subHeaderArea:{
        width:deviceWidth*0.9,
        marginBottom:10        
    },
    horizontalScrollView:{        
        paddingLeft:10,
    },

    button:{
        marginTop: 40,
    },
    imgBackground: {
        width:deviceWidth,
        height:deviceHeight,
        backgroundColor: 'transparent',
        position: 'absolute'
    },
    scrollView:{
        width:deviceWidth,
        backgroundColor:COLOR_GRAY
        
    },
    scrollViewContent:{
        alignItems:'center'
    },

    //Text-------
    subHeaderText:{
        fontSize:14,
        fontWeight:'bold',
        color:'#fff'
    },
    headerText:{
        fontSize:20,
        fontWeight:'bold',
        color:'#fff'
    }


});