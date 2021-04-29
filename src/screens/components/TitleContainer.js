import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import LOGOCOLOR from "../../assets/Logo_white_onColor.png"
import theme from "../../styles/themes.js";

/**
 * @summary This is a component that contains the title
 * of the application.
 */
class TitleContainer extends React.Component {
  render() {
    return (
      <View style={styles.TitleContainer}>
        <Image source={LOGOCOLOR} style={styles.TitleLogo}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TitleLogo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  TitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: "30%",
    borderRadius: theme.ROUNDING_SMALL,
    margin: theme.MARGIN_LARGE,
  },
  TitleText: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: "white",
    fontFamily: theme.DEFAULT_FONT,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  PurpleLine: {
    color: theme.PINK,
    fontSize: 40,
  },
});

export default TitleContainer;
