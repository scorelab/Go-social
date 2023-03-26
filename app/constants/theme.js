import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 428;
const guidelineBaseHeight = 926;

export const SCALE = size => (width / guidelineBaseWidth) * size;

export const COLORS = {
  primary: "#3d9bf9",
  secondary: "#1dd1a1",
  black: "#000000",
  white: "#ffffff",
  white2: "rgba(255,255,255,0.2)",
  gray: "#E8E8E8",
};

export const SIZES = {
  // app dimensions
  width,
  height,

  // radius
  r4: SCALE(4),
  r10: SCALE(10),
  r20: SCALE(20),

  // regular width and height
  s400: SCALE(400),
  s372: SCALE(372),
  s200: SCALE(200),
  s120: SCALE(120),
  s100: SCALE(100),
  s90: SCALE(90),
  s80: SCALE(80),
  s70: SCALE(70),
  s60: SCALE(60),
  s50: SCALE(50),
  s40: SCALE(40),
  s32: SCALE(32),
  s24: SCALE(24),
  s18: SCALE(18),

  // paddings and margins
  m4: SCALE(4),
  m6: SCALE(6),
  m10: SCALE(10),
  m14: SCALE(14),
  m16: SCALE(16),
  m18: SCALE(18),
  m20: SCALE(20),
  m24: SCALE(24),
  m30: SCALE(30),
  m40: SCALE(40),

  // font sizes
  f6: SCALE(6),
  f8: SCALE(8),
  f10: SCALE(10),
  f12: SCALE(12),
  f14: SCALE(14),
  f16: SCALE(16),
  f18: SCALE(18),
  f20: SCALE(20),
  f24: SCALE(24),
  f28: SCALE(28),
  f32: SCALE(32),
  f36: SCALE(36),
  f40: SCALE(40),
};

export const FONTS = {
  //Bold
  bold20: { fontFamily: "OpenSans-Bold", fontSize: SIZES.f20 },

  // SemiBold
  semibold14: { fontFamily: "OpenSans-SemiBold", fontSize: SIZES.f14 },
  semibold16: { fontFamily: "OpenSans-SemiBold", fontSize: SIZES.f16 },
  semibold18: { fontFamily: "OpenSans-SemiBold", fontSize: SIZES.f18 },
  semibold20: { fontFamily: "OpenSans-SemiBold", fontSize: SIZES.f20 },
  semibold24: { fontFamily: "OpenSans-SemiBold", fontSize: SIZES.f24 },
  semibold32: { fontFamily: "OpenSans-SemiBold", fontSize: SIZES.f32 },

  // Medium
  medium10: { fontFamily: "OpenSans-Medium", fontSize: SIZES.f10 },
  medium12: { fontFamily: "OpenSans-Medium", fontSize: SIZES.f12 },
  medium14: { fontFamily: "OpenSans-Medium", fontSize: SIZES.f14 },
  medium16: { fontFamily: "OpenSans-Medium", fontSize: SIZES.f16 },
  medium18: { fontFamily: "OpenSans-Medium", fontSize: SIZES.f18 },
  medium20: { fontFamily: "OpenSans-Medium", fontSize: SIZES.f20 },

  // Regular
  regular8: { fontFamily: "OpenSans-Regular", fontSize: SIZES.f8 },
  regular10: { fontFamily: "OpenSans-Regular", fontSize: SIZES.f10 },
  regular12: { fontFamily: "OpenSans-Regular", fontSize: SIZES.f12 },
  regular14: { fontFamily: "OpenSans-Regular", fontSize: SIZES.f14 },
  regular16: { fontFamily: "OpenSans-Regular", fontSize: SIZES.f16 },
};

export default { COLORS, SIZES, FONTS, SCALE };