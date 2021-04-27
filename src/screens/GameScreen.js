import React from "react";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet } from "react-native";
import styleSheets from "../styles/StyleSheets";
import QuestionButton from "./components/QuestionButton";
import Scoreboard from "./components/Scoreboard";
import theme from "../styles/themes";
import Socket from "../misc/Socket";
import Shop from "./components/Shop";
import { LinearGradient } from "expo-linear-gradient";
import { withNavigation } from "react-navigation";
import currentWeekNumber from "current-week-number";


/**
 * @summary
 */
class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: "", loggedIn: false, quizReady: false };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    if (params.loggedIn) {
      return {
        headerLeft: null,
      };
    }
  };

  componentDidMount() {
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
    Socket.on("returnUserSuccess", () => {
      Socket.off("returnUserSuccess");
      this.setState({ loggedIn: true });
      this.props.navigation.setParams({ loggedIn: this.state.loggedIn });
    });
    Socket.on("getQuestionsSuccess", () => {
      this.setState({ quizReady: true });
    });
    Socket.on("getQuestionsSuccess", () => {
      this.setState({ quizReady: true });
    });
    Socket.emit("getUser", Socket.id);
    Socket.emit("getQuestions", currentWeekNumber());
  }

  componentWillUnmount() {
    Socket.off("timeLeft");
  }

  render() {
    const isLoggedIn = this.state.loggedIn;
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        {isLoggedIn ? <Shop /> : null}
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
            onPress={() => this.props.navigation.navigate("ArtQWaiting")}
          >
            <Text style={styles.button_pink}>THIS WEEKS ARTICLE QUIZ</Text>
            <Text style={styles.timer}>{this.state.time}</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient colors={theme.PINK_GRADIENT} style={styles.button_pink}>
          <TouchableOpacity
            onPress={() => {
              this.state.quizReady
                ? this.props.navigation.navigate("NewsQ")
                : alert("Quiz not ready!");
            }}
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
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
  timer: {
    fontSize: 20,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
  button_blue: {
    fontSize: 23,
    color: "#FFFFFF",
    textAlign: "center",
    width: "95%",
    margin: theme.MARGIN_MEDIUM,
    padding: 30,
    borderRadius: theme.ROUNDING_SMALL,

    fontFamily: theme.DEFAULT_FONT,
  },
  button_pink: {
    fontSize: 23,
    color: "#FFFFFF",
    padding: 20,
    width: "95%",
    margin: theme.MARGIN_MEDIUM,
    textAlign: "center",
    borderRadius: theme.ROUNDING_SMALL,
    fontFamily: theme.DEFAULT_FONT,
  },
});

export default withNavigation(GameScreen);
