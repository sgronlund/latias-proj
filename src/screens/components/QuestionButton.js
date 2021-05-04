import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView,
} from "react-native";
import theme from "../../styles/themes.js";

const RealDeal = `This mobile application contains two different quizzes that are released every sunday at 20:00 (CET). The users objective is getting a good score in the quizzes which will reward the user with Real Deal balance that they can purchase coupons with in the shop.\n`;

const ArticleQuiz = `This quiz contains 10 questions with 4 alternatives to choose from. The questions are based on articles that are released one week prior to the quiz being released.\n`;

const NewsQuiz = `This quiz contains 12 questions with 3 alternatives to choose from. The user has 20 seconds to choose an answer and is rewarded with a higher score if the user answers quickly.\n`;

const RealDealSwedish = `Quiza på dina nyhetskunskaper! Det finns två olika quiz, dels artiklequizet där du läser några artiklar under veckan och quizar på dem på söndag kväll, sedan även nyhetsfrågor där du får snabba frågor om händelser under veckan. Läs tidningen och quiza loss!\n` 

const ArticleQuizSwedish = `Artikelquizet består av to frågor, som hänvisar till någon av de tre artiklar som finns tillgängliga under veckan. Frågorna kommer vara lite svårare men belönas desto mer! Quizet finns tillgängligt på söndagar mellan 18 och 20.\n`

const NewsQuizSwedish = `Nyhetsfrågor är 12 korta frågor om händelser från veckan. Här gäller det att svara snabbt eftersom detta ger mer poäng. Quizet finns tillgängligt hela veckan och byts ut på måndagar.\n`
/**
 * @summary This is a component which leads the user to
 * the screen where information about the application
 * is displayed.
 */
class QuestionButton extends React.Component {
  constructor(props) {
    super(props);
    //TODO: Change the states dynamically???
    this.state = { show: false, rD: RealDealSwedish, artQ: ArticleQuizSwedish, newsQ: NewsQuizSwedish };
  }

  toggleShow() {
    this.setState({ show: !this.state.show });
    return this.state.show;
  }

  render() {
    if (this.state.show) {
      return (
        <View style={styles.Main}>
          <ScrollView style={styles.Overlay}>
            <Text style={styles.TextBig}>The Real Deal:</Text>
            <Text style={styles.TextSmall}>{this.state.rD}</Text>
            <Text style={styles.TextBig}>Article Quiz:</Text>
            <Text style={styles.TextSmall}>{this.state.artQ}</Text>
            <Text style={styles.TextBig}>News Quiz:</Text>
            <Text style={styles.TextSmall}>{this.state.newsQ}</Text>
          </ScrollView>
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
    alignSelf: "flex-end",
    margin: theme.MARGIN_SMALL,
    padding: theme.PADDING_SMALL,
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
    marginBottom: theme.MARGIN_SMALL
  },
  TextSmall: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: "white",
    flexWrap: "wrap",
    marginBottom: theme.MARGIN_EXTRA_TINY
  },
  Overlay: {
    padding: theme.PADDING_MEDIUM,
    flexGrow: 1,
    backgroundColor: "black",
    opacity: 0.9,
  },
});

export default QuestionButton;
