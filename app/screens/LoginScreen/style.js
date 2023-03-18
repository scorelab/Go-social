import { StyleSheet } from "react-native";
import {COLORS, FONTS, SCALE, SIZES} from '../../constants'


export default StyleSheet.create({
  firstContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  scrollStyle: {
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.m20,
    marginBottom: SIZES.m4,
    height: SIZES.s100,
  },
  logo: {
    width: SCALE(120),
    height: SCALE(120),
  },
  formContainer: {
    marginTop: SIZES.m20,
  },
  input: {
    height: SCALE(55),
    width: SIZES.s372,
    borderRadius: SIZES.r10,
    backgroundColor: COLORS.white2,
    marginBottom: SIZES.m16,
    color: COLORS.white,
    paddingHorizontal: SIZES.m10,
  },
  loginButton: {
    width: SIZES.s372,
    height: SIZES.s50,
    borderRadius: SIZES.r10,
    backgroundColor: COLORS.white,
    marginVertical: SIZES.m14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.m20,
  },
  loginButtonFacebook: {
    width: SIZES.s372,
    height: SIZES.s60,
    backgroundColor: "#3B5998",
    marginBottom: SIZES.m30,
    marginTop: SIZES.m18,
  },
  buttonText: {
    ...FONTS.medium16,
    color: COLORS.primary,
  },
  buttonTextFacebookButton: {
    ...FONTS.medium16,
    color: COLORS.white,
  },
  imgBackground: {
    width: SCALE(40),
    resizeMode: "contain",
  },
  text: {
    color: COLORS.white,
    marginBottom: SIZES.m10,
  },
  signUpTextArea: {
    alignItems: "center",
    marginTop: SIZES.m24,
    marginBottom: SIZES.m10,
  },
});
