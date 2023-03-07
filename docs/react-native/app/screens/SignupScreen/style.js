import { StyleSheet, Dimensions } from 'react-native';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  firstContainer: {
    flex: 1,
    backgroundColor: '#3d9bf9',
  },
  container: {
    flex: 1,
    backgroundColor: '#3d9bf9',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  scrollStyle: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 5,
    height: 100,
  },
  logo: {
    width: 100,
    height: 100,
  },
  formContainer: {
    paddingTop: 20,
  },
  input: {
    height: 45,
    width: deviceWidth * 0.8,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginBottom: 15,
    color: '#FFF',
    paddingHorizontal: 10,
  },
  loginButton: {
    width: deviceWidth * 0.8,
    height: 45,
    borderRadius: 5,
    borderWidth: 0,
    backgroundColor: '#fff',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#3d9bf9',
  },
  logo: {
    width: 100,
    height: 100,
  },
  text: {
    color: '#fff',
    marginBottom: 5,
  },
  signInTextArea: {
    alignItems: 'center',
    marginTop: 25,
  },
});
