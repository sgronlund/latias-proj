import React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import QuestionButton from "./components/QuestionButton";
import Shop from "./components/Shop";
import styleSheets from "../styles/StyleSheets";
import theme from "../styles/themes";
import { LinearGradient } from "expo-linear-gradient";

export default class NewsQDone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numCorrect: this.props.navigation.state.params.numCorrect,
      completeGame: this.props.navigation.state.params.completeGame,
      totalScore: this.props.navigation.state.params.totalScore,
    };
  }

  render() {
    const game = this.state.completeGame.map((item, index) => (
      <>
        <View style={styles.rowContainer}>
          <View style={styles.FlexBox}>
            <Text style={styles.scoreText} key={index}>
              {index + 1 + "."}
            </Text>
          </View>

          <View style={styles.FlexBox}>
            <LinearGradient colors={item.answerColor} style={styles.Gradient}>
              <Text> </Text>
            </LinearGradient>
          </View>
          <View style={styles.FlexBox}>
            <Text style={styles.scoreText} key={index}>
              {item.timeLeft}
            </Text>
          </View>
        </View>
      </>
    ));
    return (
      <SafeAreaView style={[styleSheets.MainContainer]}>
        <QuestionButton />
        <Shop />

        <View style={styles.textContainer}>
          <Text style={styles.greetUser}> Well done!</Text>
          <Text style={styles.greetUser}>
            {this.state.numCorrect + "/" + this.state.completeGame.length}
          </Text>
        </View>
        <View style={styles.ScoreContainer}>
          <LinearGradient
            colors={theme.PINK_GRADIENT}
            style={styles.ScoreGradient}
          >
            <View style={[styles.VerticalLine, { left: "33%" }]} />
            <View style={[styles.VerticalLine, { right: "33%" }]} />
            <View style={styles.finalScoreContainer}>
              <Text
                style={styles.finalScore}
              >{`★ FINAL SCORE: ${this.state.totalScore} ★`}</Text>
            </View>
            <View style={styles.rowContainerText}>
              <View style={styles.FlexBox}>
                <Text style={styles.headerText}>Question</Text>
              </View>
              <View style={styles.FlexBox}>
                <Text style={styles.headerText}>Answer</Text>
              </View>
              <View style={styles.FlexBox}>
                <Text style={styles.headerText}>Time</Text>
              </View>
            </View>
            {game}
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ScoreContainer: {
    width: "80%",
    alignItems: "center",
    margin: theme.MARGIN_SMALL,
    paddingBottom: theme.PADDING_MEDIUM,
  },
  FlexBox: {
    flex: 3,
    alignItems: "center",
    margin: theme.MARGIN_EXTRA_TINY
  },
  VerticalLine: {
    height: "75%",
    width: 1,
    backgroundColor: "black",
    position: "absolute",
    bottom: 0,
  },
  ScoreGradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.ROUNDING_SMALL,
  },
  Gradient: {
    width: "40%",
    borderRadius: theme.ROUNDING_SMALL,
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    margin: theme.MARGIN_EXTRA_TINY,
  },
  finalScoreContainer: {
    marginTop: theme.MARGIN_SMALL,
    width: "100%",
    alignItems: "center",
  },
  finalScore: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: theme.DEFAULT_FONT,
    color: "#FFFFFF",
  },
  rowContainerText: {
    width: "100%",
    flexDirection: "row",
    padding: theme.PADDING_MEDIUM,
  },
  textContainer: {
    alignText: "center",
    alignItems: "center",
    margin: theme.MARGIN_SMALL,
  },
  headerText: {
    fontSize: theme.FONT_SIZE_TINY,
    fontFamily: theme.DEFAULT_FONT,
    color: "#FFFFFF",
  },
  scoreText: {
    flexShrink: 1,
    fontSize: theme.FONT_SIZE_TINY,
    fontFamily: theme.DEFAULT_FONT,
    color: "#FFFFFF",
  },
  greetUser: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: theme.DEFAULT_FONT,
    color: "#FFFFFF",
  },
});
