import React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
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
    if (this.state.quizReady) {
      return (
        <SafeAreaView style={styleSheets.MainContainer}>
          <View style={styles.readyContainer}>
            <LinearGradient
              colors={theme.PINK_GRADIENT}
              style={styles.ReadyButton}
            >
              <TouchableOpacity
                style={styles.ReadyButton}
                onPress={() => this.props.navigation.navigate("ArtQ")}
              >
                <Text style={styles.ReadyText}>START</Text>
              </TouchableOpacity>
            </LinearGradient>
            <Text style={styles.TitleText}>────────────────────────</Text>
            {/*<Text style={styles.TitleText}>
              ────── This weeks topics ──────
            </Text>
            <FlatList
              data={[
                { key: "Topic number 1" },
                { key: "Topic number 2" },
                { key: "Topic number 3" },
              ]}
              renderItem={({ item }) => (
                <Text style={styles.TitleText}>{item.key}</Text>
              )}
            />*/}
          </View>
          <View style={styles.scoreboard}>
            <Scoreboard />
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styleSheets.MainContainer}>
          <QuestionButton />
          {isLoggedIn ? <Shop /> : null}
          <View style={styles.Container}>
            <Text style={styles.Text}>THIS QUIZ IS AVAILABLE IN</Text>
            <Text style={styles.timerText}>{this.state.time}</Text>
            <LinearGradient colors={theme.PINK_GRADIENT} style={styles.Button}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Read")}
              >
                <Text style={styles.ButtonText}>READ THIS WEEKS ARTICLES</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.scoreboard}>
            <Scoreboard style={{ height: "100%" }} />
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  scoreboard: {
    width: "100%",
    height: "30%",
    position: "absolute",
    top: "55%",
    marginBottom: 0,
    alignItems: "center",
  },
  readyContainer: {
    flex: 0,
    top: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  TitleText: {
    height: "50px",
    color: "white",
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
  },
  ReadyButton: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 125,
    margin: 30,
  },
  ReadyText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
  Container: {
    width: "80%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.DARK_PURPLE,
    borderRadius: theme.ROUNDING_SMALL,
    top: "10%",
    paddingBottom: 30,
  },
  Text: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
    top: "10%",
    position: "absolute",
  },
  timerText: {
    textAlign: "center",
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
  Button: {
    width: "90%",
    height: "18%",
    justifyContent: "center",
    alignItems: "center",
    bottom: "5%",
    position: "absolute",
    borderRadius: theme.ROUNDING_SMALL,
    shadowOffset: theme.SHADOW_OFFSET,
    shadowOpacity: theme.SHADOW_OPACITY,
  },
  ButtonText: {
    color: "white",
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
  },
});

export default ArtQWaiting;
