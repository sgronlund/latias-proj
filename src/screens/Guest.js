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
import Socket from "../misc/Socket";
import { LinearGradient } from "expo-linear-gradient";
import { withNavigation } from "react-navigation";

/**
 * @summary
 */
class Guest extends React.Component {
  //FIXME: Please change this name to something more relevatn
  constructor(props) {
    super(props);
    this.state = { time: "" };
    this.initSocket();
  }

  /**
   * @function
   * @summary Initializes socket listeners for checking for login
   * success or failure and removes the listeners
   */
  initSocket() {
    Socket.on("timeLeft", (timeLeft) => {
      this.setState({ time: timeLeft });
    });
  }

  componentWillUnmount() {
    Socket.off("timeLeft");
  }

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <Toolbar />
        <QuestionButton />
        <Text style={styles.header}>WHAT DO YOU WANT TO DO?</Text>

        <LinearGradient colors={theme.BLUE_GRADIENT} style={styles.button_blue}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Read")}
          >
            <Text style={styles.button_blue}>READ THIS WEEKS ARTICLE</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient colors={theme.PINK_GRADIENT} style={styles.button_pink}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Read")}
          >
            <Text style={styles.button_pink}>THIS WEEKS ARTICLE QUIZ</Text>
            <Text>{this.state.time}</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient colors={theme.PINK_GRADIENT} style={styles.button_pink}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("NewsQ")}
          >
            <Text style={styles.button_pink}>THIS WEEKS NEWS QUIZ</Text>
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  button_blue: {
    fontSize: 23,
    color: "#FFFFFF",
    textAlign: "center",
    width: "95%",
    margin: theme.MARGIN_MEDIUM,
    padding: 30,
    borderRadius: theme.ROUNDING_SMALL,
  },
  button_pink: {
    fontSize: 23,
    color: "#FFFFFF",
    padding: 20,
    width: "95%",
    margin: theme.MARGIN_MEDIUM,
    textAlign: "center",
    borderRadius: theme.ROUNDING_SMALL,
  },
});

export default withNavigation(Guest);
