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
  }
});

export default TitleContainer;
