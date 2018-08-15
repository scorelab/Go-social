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
    coverImageArea:{
        backgroundColor:'red',
        height: deviceHeight*0.3,
        position:'absolute',
        top:0
    },
    profileImage:{
        marginTop:deviceHeight*0.3 - 80,
        width:160,
        height:160,
        borderRadius:80
    },

    contentArea: {
        marginTop:10,
        alignItems:'center',
        marginBottom:100     
    },
    nameFont: {
        fontSize:18,
        lineHeight:18,
        fontWeight:'bold'
    },
    cityFont: {
        fontSize:16,
        lineHeight:16,
        // fontWeight:'bold'
    }

    

   
});