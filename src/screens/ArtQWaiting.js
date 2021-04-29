import React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import theme from "../styles/themes";
import { LinearGradient } from "expo-linear-gradient";
import styleSheets from "../styles/StyleSheets";
import QuestionButton from "./components/QuestionButton";
import Scoreboard from "./components/Scoreboard";
import { Socket } from "../misc/Socket";
import Shop from "./components/Shop";

class ArtQWaiting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: "", loggedIn: false, quizReady: false };
  }

  componentDidMount() {
    this.initSockets();
  }

  componentWillUnmount() {
    Socket.off("timeLeft");
    Socket.off("quizReady");
    Socket.off("returnUserSuccess");
  }

  /**
   * @function
   * @summary initializes socket listeners
   * for the class
   */
  initSockets() {
    Socket.on("timeLeft", (timeLeft) => {
      this.setState({ time: timeLeft });
    });
    Socket.on("returnUserSuccess", () => {
      this.setState({ loggedIn: true });
    });
    Socket.emit("getUser", Socket.id);
    Socket.emit("isQuizReady");
    Socket.on("quizReady", () => {
      this.setState({ quizReady: true });
    });
  }

  render() {
    const isLoggedIn = this.state.loggedIn;
    const quizReady = this.state.quizReady;
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <QuestionButton />
        {isLoggedIn ? <Shop /> : null}
        <View style={styles.Container}>
          {quizReady ? (
            <>
              <Text style={styles.Text}>THIS QUIZ IS AVAILABLE NOW</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ArtQ")}
                style={styles.ReadyButton}
              >
                <LinearGradient
                  colors={theme.PINK_GRADIENT}
                  style={styles.Gradient}
                >
                  <Text style={styles.ButtonText}>START</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.Text}>THIS QUIZ IS AVAILABLE IN</Text>
              <Text style={styles.timerText}>{this.state.time}</Text>
            </>
          )}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Read")}
            style={styles.Button}
          >
            <LinearGradient
              colors={theme.PINK_GRADIENT}
              style={styles.GradientButton}
            >
              <Text style={styles.ButtonText}>READ THIS WEEKS ARTICLES</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Scoreboard/>
      </SafeAreaView>
    );
  }
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

global.responsive = {
  width: width / 8 + height / 8,
  height: width / 8 + height / 8,
  borderRadius: width / 16 + height / 16,
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#081842",
    height: "40%",
    width: "80%",
    alignItems: "center",
    padding: theme.PADDING_MEDIUM,
    borderRadius: theme.ROUNDING_SMALL,
    margin: theme.MARGIN_LARGE,
  },
  GradientButton: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: theme.ROUNDING_SMALL,
  },
  Gradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: responsive.borderRadius,
  },
  scoreboard: {
    width: "100%",
    height: "35%",
    alignItems: "center",
  },
  TitleText: {
    height: 50,
    color: "white",
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
  },
  ReadyButton: {
    width: responsive.width,
    height: responsive.height,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: responsive.borderRadius,
    margin: 30,
  },
  TextContainer: {
    alignItems: "center",
    height: "20%",
    width: "100%",
  },
  Text: {
    fontSize: theme.FONT_SIZE_TINY,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
  timerText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
  Button: {
    width: "90%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.ROUNDING_SMALL,
    bottom: "5%",
    position: "absolute",
  },
  ButtonText: {
    color: "white",
    fontSize: theme.FONT_SIZE_TINY,
  },
});

export default ArtQWaiting;
