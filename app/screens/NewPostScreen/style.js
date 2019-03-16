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
    text: {
        height: '30%',
        width: '90%', 
        backgroundColor: 'rgba(255,255,255,0.15)',
        marginVertical:10,
        color: '#000',
        paddingHorizontal: 10,  
        fontSize:16,
        textAlignVertical:'top'             
    },
    nameText:{
        height: 'auto',
        width: '90%', 
        backgroundColor: 'rgba(255,255,255,0.15)',
        marginVertical:10,
        color: '#000',
        paddingHorizontal: 10,  
        fontSize:16,
        textAlignVertical:'center' 
    },  
    postButton:{
        width:'100%',        
        justifyContent:'center',
        alignItems:'center',               
    },
    profileImage:{
        width:50,
        height:50,
        borderRadius:25,
        marginHorizontal:5,
        marginVertical:5
    },
    row:{
        flexDirection:'row',
        width:'90%',
        marginVertical:5,
        marginHorizontal:15
    },
    card:{
        padding:0,
        width:'100%',
        height:'auto'
    },
    list:{
        padding: 0,
        width:'100%',
        borderWidth:1,
        borderTopColor:'#000'
    }  
});