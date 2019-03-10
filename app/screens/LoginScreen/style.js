import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_LIGHT } from '../../config/styles' ;

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  
    container: {
        flex:1,
        backgroundColor:'#3d9bf9',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    logoContainer: {
        //width:deviceWidth*0.4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30,
        marginBottom:25,
        height:100,
    },
    logo: {
        width:100,
        height:100,

    },
    formContainer: {
        paddingTop:0
    },
    input:{
        height:45,
        width:deviceWidth*0.8,
        borderRadius:5,
        backgroundColor:'rgba(255,255,255,0.15)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10
    },
    loginButton:{
        width: deviceWidth*0.8,
        height:45,
        borderRadius:5,
        borderWidth:0,
        backgroundColor:'#fff',
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center'
    },
    loginButtonFacebook:{
        width: deviceWidth*0.8,
        height:45,
        borderRadius:5,
        borderWidth:0,
        backgroundColor:'#3B5998',
        marginBottom:20,
        marginTop:10
    },
    buttonText: {
        fontSize:16,
        color:'#3d9bf9'
    },
    buttonTextFacebookButton: {
        fontSize:16,
        color:'#fff'
    },
    imgBackground: {
        width:deviceWidth*0.3,
        resizeMode:'contain'
    },
    text:{
        color:'#fff',
        marginBottom: 10
    },
    signUpTextArea:{
        position:'absolute',
        bottom:25,
        alignItems:'center'
    }
});