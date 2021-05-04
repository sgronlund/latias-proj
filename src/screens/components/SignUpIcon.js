import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../styles/themes.js";
import { withNavigation } from "react-navigation";

/**
 * @summary This is a component which replaces the shop component if the user is not logged in, redirects the user to sign up.
 */
class SignUpIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.Container}
        onPress={() => this.props.navigation.navigate("Sign")}
      >
        <Text style={styles.Text}>Sign up</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    paddingHorizontal: "5%",
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

export default withNavigation(SignUpIcon);
