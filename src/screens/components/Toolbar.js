import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import theme from "../../styles/themes";

/**
 * @summary This is a component that contains the toolbar
 * for the application. The user may return to a previous
 * page from this component.
 */
class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.Toolbar}>
        {this.props.backButton ? (
          <View style={styles.Button}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={styles.Arrow}>↶</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.TextContainer}>
          <Text style={styles.Text}>{this.props.title || ""}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Toolbar: {
    backgroundColor: "#545985",
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "10%",
  },
  TextContainer: {
    position: "absolute",
    alignSelf: "center",
  },
  Button: {
    height: "90%",
    left: "2%",
  },
  Arrow: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: "white",
    fontFamily: theme.DEFAULT_FONT,
  },
  Text: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: "white",
    fontFamily: theme.DEFAULT_FONT,
  },
});

export default withNavigation(Toolbar);
