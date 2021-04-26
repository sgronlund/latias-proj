import React from "react";
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../styles/themes";
import { LinearGradient } from "expo-linear-gradient";
import styleSheets from "../styles/StyleSheets";
import QuestionButton from "./components/QuestionButton";
import { Socket } from "../misc/Socket";
import currentWeekNumber from "current-week-number";

class ArtQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {playerCount: 0}
  }

  componentDidMount() {
    Socket.on("updatePlayerCount", (playerCount) => {
      this.setState({playerCount: playerCount});
    })
    Socket.emit("quizConnect");
  }

  componentWillUnmount() {
    Socket.emit("quizDisconnect");
  }

  render() {
    return(
      <SafeAreaView style={styleSheets.MainContainer}>
        <Text style={styles.timerText}>{"Player count: " + this.state.playerCount}</Text>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  button_pink: {
    fontSize: 23,
    color: "#FFFFFF",
    textAlign: "center",
    width: "95%",
    margin: theme.MARGIN_MEDIUM,
    padding: 27,
    borderRadius: theme.ROUNDING_SMALL,
  },
  button_blue: {
    fontSize: 22,
    color: "#FFFFFF",
    textAlign: "center",
    width: "95%",
    margin: theme.MARGIN_SMALL,
    padding: 12,
    borderRadius: theme.ROUNDING_SMALL,
  },
  numberQ: {
    color: "#FFFFFF",
    left: 150,
    marginTop: 30,
    marginBottom: -5,
    fontSize: 20,
  },
  timerText: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
});

export default ArtQ;
