import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import theme from "../../styles/themes.js";

const RealDeal = `This mobile application contains two different quizzes that are released every sunday at 20:00 (CET). The users objective is getting a good score in the quizzes which will reward the user with Real Deal balance that they can purchase coupons with in the shop.`;

const ArticleQuiz = `This quiz contains 10 questions with 4 alternatives to choose from. The questions are based on articles that are released one week prior to the quiz being released.`;

const NewsQuiz = `This quiz contains 12 questions with 3 alternatives to choose from. The user has 20 seconds to choose an answer and is rewarded with a higher score if the user answers quickly.`;

/**
 * @summary This is a component which leads the user to
 * the screen where information about the application
 * is displayed.
 */
class QuestionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  toggleShow() {
    this.setState({ show: !this.state.show });
    return this.state.show;
  }

  render() {
    if (this.state.show) {
      return (
        <View style={styles.Main}>
          <View style={styles.Overlay}>
            <Text style={styles.TextBig}>The Real Deal:</Text>
            <Text style={styles.TextSmall}>{RealDeal}</Text>
            <Text style={styles.TextBig}>Article Quiz:</Text>
            <Text style={styles.TextSmall}>{ArticleQuiz}</Text>
            <Text style={styles.TextBig}>News Quiz:</Text>
            <Text style={styles.TextSmall}>{NewsQuiz}</Text>
          </View>
          <View style={styles.Container}>
            <TouchableOpacity
              style={styles.Circle}
              onPress={() => this.toggleShow()}
            >
              <Text style={styles.QuestionMark}>?</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.Container}>
          <TouchableOpacity
            style={styles.Circle}
            onPress={() => this.toggleShow()}
          >
            <Text style={styles.QuestionMark}>?</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const width = Dimensions.get("window").width;

global.responsive = {
  width: width / 8,
  height: width / 8,
  borderRadius: width / 16,
};

const styles = StyleSheet.create({
  Main: {
    zIndex: 998,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  Container: {
    position: "absolute",
    margin: theme.MARGIN_MEDIUM,
    bottom: 0,
    right: 0,
  },
  Circle: {
    width: responsive.width,
    height: responsive.height,
    borderRadius: responsive.borderRadius,
    backgroundColor: "black",
    opacity: 0.9,
    textAlign: "center",
    justifyContent: "center",
  },
  QuestionMark: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    textAlign: "center",
    color: "white",
  },
  TextBig: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: "white",
  },
  TextSmall: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: "white",
    flexWrap: 1,
  },
  Overlay: {
    padding: theme.PADDING_MEDIUM,
    flexGrow: 1,
    backgroundColor: "black",
    opacity: 0.9,
  },
});

export default QuestionButton;
