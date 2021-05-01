import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

global.dimensions = {
  width: width,
  height: height / 12,
};

global.fontSizes = {
  Tiny: width / 26,
  ExtraSmall: width / 18,
  Small: width / 16,
  Medium: width / 8,
  Large: width / 6,
  
};

global.margins = {
  align: width * 0.1,
  ExtraTiny: width / 200,
  Tiny: width / 60,
  Small: width / 40,
  Medium: width / 15,
  Large: width / 10,
};

global.rounding = {
  ExtraSmall: width / 50,
  Small: width / 22,
  Medium: width / 12,
};

/**
 * @brief This file contains themes that are used to
 * style different components.
 */
export default {
  FONT_SIZE_TINY: fontSizes.Tiny,
  FONT_SIZE_EXTRA_SMALL: fontSizes.ExtraSmall,
  FONT_SIZE_SMALL: fontSizes.Small,
  FONT_SIZE_MEDIUM: fontSizes.Medium,
  FONT_SIZE_LARGE: fontSizes.Large,
  PADDING_SMALL: 10,
  PADDING_MEDIUM: 15,
  PADDING_LARGE: 30,
  ROUNDING_EXTRA_SMALL: rounding.ExtraSmall,
  ROUNDING_SMALL: rounding.Small,
  ROUNDING_MEDIUM: rounding.Medium,
  DEFAULT_FONT: "Roboto Slab",
  MARGIN_INPUT: margins.align,
  MARGIN_EXTRA_TINY: margins.ExtraTiny,
  MARGIN_TINY: margins.Tiny,
  MARGIN_SMALL: margins.Small,
  MARGIN_MEDIUM: 15,
  MARGIN_LARGE: 25,
  LIGHT_BLUE: "#3E9EFE",
  PINK: "#BF69E2",
  PURPLE: "#383E6E",
  DARK_PURPLE: "#081842",
  PURPLE_LIGHT: "#545985",
  GREEN: "#1CC800",
  RED: "#F20A0A",
  ORANGE: "#FFB966",
  GREY: "#C4C4C4",
  SHADOW_OFFSET: { width: 0, height: 4 },
  SHADOW_OPACITY: 0.35,
  BLUE_GRADIENT: ["#4DA6FF", "#377DC2"],
  DARK_BLUE_GRADIENT: ["#005bff", "#0400ff"],
  PINK_GRADIENT: ["#BF69E2", "#C3518D"],
  GREEN_GRADIENT: ["#0a7909", "#19ff00"],
  RED_GRADIENT: ["#792409", "#ff3500"],
  ORANGE_GRADIENT: ["#ff5e00", "#ff9100"],
  HEIGHT: dimensions.height,
  WIDTH: dimensions.width,
};
