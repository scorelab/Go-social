import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_LIGHT } from '../../config/styles' ;

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({

    container: {
        flex:1,
        backgroundColor:'#03A9F4'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width:100,
        height:100,

    },
    formContainer: {
        padding:20
    },
    input:{
        height:40,
        backgroundColor:'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10
    }

});