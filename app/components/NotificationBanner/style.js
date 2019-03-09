import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_GRAY } from '../../config/styles' ;
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        width:'100%',

    },
    scrollView:{
        width:'100%',
        backgroundColor:COLOR_GRAY,
       
        
    },
    scrollViewContent:{
        alignItems:'center',
        paddingBottom:10
    },
    cardContainer: {
        flex:1,
        width:'90%',
        backgroundColor:'#fff',
        borderRadius:5,
        // height:200,
        alignItems:'center',
        justifyContent:'flex-start',
        // marginBottom:20,
        marginTop:10
    },
    cardHedear:{
        marginLeft:10,
        marginTop:5,
        marginRight:10,
        // marginBottom:10,
        // width:deviceWidth,
        height:80,
        flexDirection:'row'
    },
    profilePicArea:{        
        flex:0.25,
        // width:deviceWidth * 0.2,
        // backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center'
    },
    userDetailArea:{
        flex:0.75,
        paddingLeft:8,
        // width:deviceWidth * 0.8,
        flexDirection:'column',
        // backgroundColor:'green'
    },
    userNameRow:{
        flex:0.4,
        // width:deviceWidth * 0.8,
        // backgroundColor:'yellow',
        paddingTop:10
    },
    meaasageRow:{
        flex:0.6,
        // width:deviceWidth * 0.8,
        // backgroundColor:'blue'
    },
    userImage:{
        height:60,
        width:60,
        borderRadius:30
    },
    badgeCount:{
        backgroundColor:'#3d9bf9',
        height:20,
        width:20,
        borderRadius:10,
        alignItems:'center',
        justifyContent: 'center',
        position:'absolute',
        bottom:10,
        right:10
    },
    imageThumbnails:{
        height:70,
        width:70,
        borderRadius:35,
    },
    detailRow:{
        width:'100%',
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:5,
        marginTop:10
    },
    thumbnailRow:{
        flex:1,
        width:'100%',
        // backgroundColor:'red',
        flexDirection:'row',
        justifyContent:'space-evenly',
        paddingTop:30,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:30
    },

    //Font styles

    nameText:{
        fontSize:14,
        color:'#4e5861',
        fontWeight:'bold'
    },
    meaasageText:{
        fontSize:16,
        color:'#95a3ad'
    },
    paraText:{
        fontSize:16,
        color:'#555f68'
    },
    countText:{
        color:'#fff',
        fontSize:12,
        fontWeight:'bold'
    }
    
});