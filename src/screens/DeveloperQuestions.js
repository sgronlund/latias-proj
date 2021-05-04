import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import theme from "../styles/themes";
import styleSheets from "../styles/StyleSheets";
import { Socket } from "../misc/Socket";
import currentWeekNumber from "current-week-number";

/**
 * @summary This screen is where the developer can
 * see the currently submitted questions
 */
class DeveloperQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NewsQuestions: [], //Contains all news quiz questions
      ArtQuestions: [], //Contains all article quiz questions
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions() {
    Socket.on("getQuestionsSuccess", (newsQuestions) => {
      var tmpNewsQuestions = [];
      for (const newsQuestion of newsQuestions) {
        tmpNewsQuestions.push(newsQuestion.question);
      }
      this.setState({
        NewsQuestions: tmpNewsQuestions,
      });
    });

    Socket.on("getQuestionsArticleSuccess", (artQuestions) => {
      var tmpArtQuestions = [];
      for (const artQuestion of artQuestions) {
        tmpArtQuestions.push(artQuestion.question);
      }
      this.setState({
        ArtQuestions: tmpArtQuestions,
      });
    });
    Socket.emit("getQuestionsArticle", currentWeekNumber());
    Socket.emit("getQuestions", currentWeekNumber());
  }

  componentWillUnmount() {
    Socket.off("getQuestionsArticleSuccess");
    Socket.off("getQuestionsArticleFailure");
    Socket.off("getQuestionsSuccess");
    Socket.off("getQuestionsFailure");
  }

  render() {
    const newsQuestions = this.state.NewsQuestions.map((item, index) => (
      <>
        <View style={styles.rowContainer}>
          <Text style={styles.Text} key={index}>
            {index + 1 + ". " + item}
          </Text>
        </View>
      </>
    ));
    const artQuestions = this.state.ArtQuestions.map((item, index) => (
      <>
        <View style={styles.rowContainer}>
          <Text style={styles.Text} key={index}>
            {index + 1 + ". " + item}
          </Text>
        </View>
      </>
    ));
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <View style={styles.Container}>
          <Text style={styles.TextBig}>News Quiz:</Text>
          {newsQuestions}
          <Text style={styles.TextBig}>Article Quiz:</Text>
          {artQuestions}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    margin: theme.MARGIN_MEDIUM,
    padding: theme.PADDING_LARGE,
    alignItems: "center",
    backgroundColor: theme.DARK_PURPLE,
    flexGrow: 1,
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    margin: theme.MARGIN_EXTRA_TINY,
  },
  Text: {
    fontSize: theme.FONT_SIZE_TINY,
    fontFamily: theme.DEFAULT_FONT,
    color: "#FFFFFF",
  },
  TextBig: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: theme.DEFAULT_FONT,
    color: "#FFFFFF",
  },
});

export default DeveloperQuestions;
