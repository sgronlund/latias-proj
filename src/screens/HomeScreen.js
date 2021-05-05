import React from "react";
import { Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import theme from "../styles/themes";
import TitleContainer from "./components/TitleContainer";
import QuestionButton from "./components/QuestionButton";
import styleSheets from "../styles/StyleSheets";
import { withNavigation } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";

/**
 * @summary This represents the screen you get when you open
 * the application. From here you can navigate to the login
 * page, the signup page or sign in as a guest
 */
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <TitleContainer />
        <QuestionButton />
        <LinearGradient
          colors={theme.PINK_GRADIENT}
          style={styleSheets.GenericButton}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("LogIn")}
            style={styles.GenericButton}
          >
            <Text style={styleSheets.ButtonText}>LOGGA IN</Text>
          </TouchableOpacity>
        </LinearGradient>
        <Text style={styles.Text}>───── eller ─────</Text>
        <LinearGradient
          colors={theme.BLUE_GRADIENT}
          style={styleSheets.GenericButton}
        >
          <TouchableOpacity
            style={styles.GenericButton}
            onPress={() => this.props.navigation.navigate("Sign")}
          >
            <Text style={styleSheets.ButtonText}>REGISTRERA</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={theme.BLUE_GRADIENT}
          style={styleSheets.GenericButton}
        >
          <TouchableOpacity
            style={styles.GenericButton}
            onPress={() => this.props.navigation.navigate("GameScreen")}
          >
            <Text style={styleSheets.ButtonText}>SPELA SOM GÄST</Text>
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.PURPLE,
  },

  GenericButton: {
    flex: 1,
    alignItems: "center",
  },

  TitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#545985",
    width: "95%",
    height: "35%",
    borderRadius: theme.ROUNDING_SMALL,
    margin: theme.MARGIN_MEDIUM,
  },
  Text: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: "white",
    fontFamily: theme.DEFAULT_FONT,
  },
});

export default withNavigation(HomeScreen);
