import { StyleSheet } from "react-native";
import theme from "./themes.js";

/**
 * @brief This file contains a stylesheet for styles that
 * are commonly used throughout the program.
 */
const styleSheets = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.PURPLE,
  },
  Input: {
    flexBasis: 50,
    width: "80%",
    borderWidth: 1,
    backgroundColor: "white",
    textAlign: "center",
    fontSize: theme.FONT_SIZE_TINY,
    borderRadius: theme.ROUNDING_EXTRA_SMALL,
    marginBottom: theme.MARGIN_SMALL,
  },
  GenericButton: {
    width: "80%",
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.PADDING_MEDIUM,
    borderRadius: theme.ROUNDING_MEDIUM,
    margin: theme.MARGIN_MEDIUM,
    shadowOffset: theme.SHADOW_OFFSET,
    shadowOpacity: theme.SHADOW_OPACITY,
    zIndex: 1,
  },
  PinkBackground: {
    backgroundColor: theme.PINK,
  },
  LightBlueBackground: {
    backgroundColor: theme.LIGHT_BLUE,
  },
  ButtonText: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: "white",
    fontFamily: theme.DEFAULT_FONT,
  },
  boarder: {
    width: 100 * 5,
    height: 100,
    backgroundColor: "#545985",
  },
  inputHeader: {
    margin: theme.MARGIN_SMALL,
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: "white",
    fontFamily: theme.DEFAULT_FONT,
    alignSelf: "flex-start",
    marginLeft: theme.MARGIN_INPUT,
  },
});

export default styleSheets;
