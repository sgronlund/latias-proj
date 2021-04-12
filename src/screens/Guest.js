import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
} from "react-native";
import Toolbar from "./components/Toolbar";
import styleSheets from "../styles/StyleSheets";
import QuestionButton from "./components/QuestionButton";
import theme from "../styles/themes";

const URL =
  "https://www.dn.se/ekonomi/har-ar-landets-basta-och-samsta-skolkommuner/";

/**
 * @summary
 */
class Guest extends React.Component {
  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <Toolbar />
        <QuestionButton />
        <Text style={styles.TitleText}>WHAT DO YOU WANT TO DO?</Text>
        <TouchableOpacity style={[styles.Button, styleSheets.PinkBackground]}>
          <Text style={styles.Text}>THIS WEEKS ARTICLE QUIZ</Text>
          <Text style={styles.SmallText}>Quiz is available in 03:11 h</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.Button, styleSheets.PinkBackground]}>
          <Text style={styles.Text}>THIS WEEKS NEWS QUIZ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.Button, styleSheets.LightBlueBackground]}
          onPress={() => Linking.openURL(URL)}
        >
          <Text style={styles.Text}>READ THIS WEEKS ARTICLE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.Button, styleSheets.LightBlueBackground]}
        >
          <Text style={styles.Text}>SCOREBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.SignUpButton}
          onPress={() => this.props.navigation.navigate("Sign")}
        >
          <Text style={styles.SignUpText}>SIGN UP</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Button: {
    width: "80%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.PADDING_MEDIUM,
    borderRadius: theme.ROUNDING_SMALL,
    margin: theme.MARGIN_MEDIUM,
    shadowOffset: theme.SHADOW_OFFSET,
    shadowOpacity: theme.SHADOW_OPACITY,
  },
  SignUpButton: {
    width: "30%",
    height: "5%",
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.MARGIN_MEDIUM,
    bottom: 0,
  },
  SignUpText: {
    fontSize: 14,
    color: "white",
    fontFamily: theme.DEFAULT_FONT,
  },
  TitleText: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: "white",
    fontFamily: theme.DEFAULT_FONT,
    margin: 30,
  },
  Text: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: "white",
    fontFamily: theme.DEFAULT_FONT,
  },
  SmallText: {
    fontSize: 15,
    color: "white",
    fontFamily: theme.DEFAULT_FONT,
  },
});

export default Guest;
