import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import styleSheets from "../../styles/StyleSheets";
import { withNavigation } from "react-navigation";
import theme from "../../styles/themes";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

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
        <TouchableOpacity
          style={styles.Button}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.Arrow}>↶</Text>
        </TouchableOpacity>
        <View style={styles.TextContainer}>
          <Text style={styles.Text}>
            REAL DEAL{" "}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Settings")}
            >
              <Ionicons
                name="ios-settings-sharp"
                size={35}
                color={theme.DARK_PURPLE}
                style={styles.gear}
              />
            </TouchableOpacity>
          </Text>
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
    height: "10%",
  },
  TextContainer: {
    position: "absolute",
    alignSelf: "center",
  },
  Button: {
    left: "5%",
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
  gear: {
    left: 100,
  },
});

export default withNavigation(Toolbar);
