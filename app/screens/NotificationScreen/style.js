import { StyleSheet, Dimensions } from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    scrollView:{
        width:deviceWidth,
        backgroundColor:'#E8E8E8',
       
        
    },
    scrollViewContent:{
        alignItems:'center',
        paddingBottom:10
    },
   
});