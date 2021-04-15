import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import theme from "../styles/themes";
import TitleContainer from "./components/TitleContainer";
import QuestionButton from "./components/QuestionButton";
import styleSheets from "../styles/StyleSheets";
import { withNavigation } from "react-navigation";

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
        <View style={styleSheets.Toolbar}></View>
        <TitleContainer />
        <QuestionButton />
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.PinkBackground]}
          onPress={() => this.props.navigation.navigate("LogIn")}
        >
          <Text style={styleSheets.ButtonText}>LOG IN</Text>
        </TouchableOpacity>
        <Text style={styles.Text}>───── or ─────</Text>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.LightBlueBackground]}
          onPress={() => this.props.navigation.navigate("Sign")}
        >
          <Text style={styleSheets.ButtonText}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.LightBlueBackground]}
          onPress={() => this.props.navigation.navigate("Cont")}
        >
          <Text style={styleSheets.ButtonText}>PLAY AS GUEST</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.LightBlueBackground]}
          onPress={() => this.props.navigation.navigate("Settings")}
        >
          <Text style={styleSheets.ButtonText}>GO TO SETTINGS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("NQReady")}
          style={[styleSheets.GenericButton, styleSheets.LightBlueBackground]}
        >
          <Text>THIS IS A TEMPORARY BUTTON</Text>
        </TouchableOpacity>
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
  TitleText: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: "white",
    fontFamily: theme.DEFAULT_FONT,
  },
  PurpleLine: {
    color: theme.PINK,
    fontSize: 40,
  },
  Image: {
    width: 50,
    height: 50,
    backgroundColor: "transparent",
    alignSelf: "flex-end",
  },
});

export default withNavigation(HomeScreen);
