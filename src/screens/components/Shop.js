import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../styles/themes.js";

/**
 * @summary This is a component which leads the user to
 * the shop screen.
 */
class Shop extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.Container}>
        <Text style={styles.Text}>97 $</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: 80,
    height: 30,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.MARGIN_MEDIUM,
    bottom: 0,
  },
  Text: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: "white",
    fontFamily: "Roboto Slab",
  },
});

export default Shop;
