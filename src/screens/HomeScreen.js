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
          style={[styleSheets.GenericButton, styleSheets.PinkBackground]}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("LogIn")}
          >
            <Text style={styleSheets.ButtonText}>LOG IN</Text>
          </TouchableOpacity>
        </LinearGradient>
        <Text style={styles.Text}>───── or ─────</Text>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.LightBlueBackground]}
          onPress={() => this.props.navigation.navigate("Sign")}
        >
          <Text style={styleSheets.ButtonText}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.LightBlueBackground]}
          onPress={() => this.props.navigation.navigate("GameScreen")}
        >
          <Text style={styleSheets.ButtonText}>PLAY AS GUEST</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Text: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: "white",
    fontFamily: theme.DEFAULT_FONT,
  },
});

export default withNavigation(HomeScreen);
