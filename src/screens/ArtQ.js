import React from "react";
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../styles/themes";
import { LinearGradient } from "expo-linear-gradient";
import styleSheets from "../styles/StyleSheets";
import QuestionButton from "./components/QuestionButton";
import { Socket } from "../misc/Socket";

class ArtQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playerCount: 0 };
  }

  componentDidMount() {
    Socket.on("updatePlayerCount", (playerCount) => {
      this.setState({ playerCount: playerCount });
    });
    Socket.emit("quizConnect");
  }

  componentWillUnmount() {
    Socket.emit("quizDisconnect");
  }

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <QuestionButton/>
        <Text style={styles.Text}>
          {"Player count: " + this.state.playerCount}
        </Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Text: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
});

export default ArtQ;
