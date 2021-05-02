import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import styleSheets from "../styles/StyleSheets";
import QuestionButton from "./components/QuestionButton";
import Scoreboard from "./components/Scoreboard";
import theme from "../styles/themes";
import Socket from "../misc/Socket";
import Shop from "./components/Shop";
import { LinearGradient } from "expo-linear-gradient";
import { withNavigation } from "react-navigation";
import currentWeekNumber from "current-week-number";
import SignUpIcon from "./components/SignUpIcon";

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
      Socket.off("getQuestionsSuccess");
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
        {isLoggedIn ? <Shop /> : <SignUpIcon />}
        <QuestionButton />
        <View style={styles.TextContainer}>
          <Text style={styles.header}>WHAT DO YOU WANT TO DO?</Text>
        </View>

        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Read")}
            style={styles.Button}
          >
            <LinearGradient
              colors={theme.BLUE_GRADIENT}
              style={styles.Gradient}
            >
              <Text style={styles.ButtonText}>READ THIS WEEKS ARTICLE</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ArtQWaiting")}
            style={styles.Button}
          >
            <LinearGradient
              colors={theme.PINK_GRADIENT}
              style={styles.Gradient}
            >
              <Text style={styles.ButtonText}>THIS WEEKS ARTICLE QUIZ</Text>
              <Text style={styles.timer}>{this.state.time}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.state.quizReady
                ? this.props.navigation.navigate("NewsQReady")
                : alert("Quiz not ready!");
            }}
            style={styles.Button}
          >
            <LinearGradient
              colors={theme.PINK_GRADIENT}
              style={styles.Gradient}
            >
              <Text style={styles.ButtonText}>THIS WEEKS NEWS QUIZ</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  TextContainer: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonContainer: {
    height: "70%",
    width: "95%",
    alignItems: "center",
    margin: theme.MARGIN_SMALL,
  },
  Button: {
    width: "100%",
    height: "30%",
    marginTop: theme.MARGIN_SMALL,
  },
  Gradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.ROUNDING_SMALL,
  },
  ButtonText: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: "#FFFFFF",
  },
  header: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
  timer: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
});

export default withNavigation(GameScreen);
