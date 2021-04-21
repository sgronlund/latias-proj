import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import theme from "../styles/themes";
import { LinearGradient } from "expo-linear-gradient";
import Toolbar from "./components/Toolbar";
import styleSheets from "../styles/StyleSheets";
import QuestionButton from "./components/QuestionButton";
import { Socket } from "../misc/Socket";
import currentWeekNumber from "current-week-number";

class NewsQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      randomAlternatives: [],
      question: "",
      currentQuestion: 0,
    };
  }

  /**
   * @function
   * @summary calls function before component is rendered
   */
  componentDidMount() {
    this.getQuestions();
  }

  /**
   * @function
   * @summary Initializes some socket listeners and calls for the
   * server to get the questions for the current week.
   */
  getQuestions = () => {
    Socket.emit("getQuestions", currentWeekNumber());
    Socket.on("getQuestionsSuccess", (questions) => {
      Socket.off("getQuestionsSuccess");
      this.setState({ questions: questions });
      this.nextQuestion();
    });
    Socket.on("getQuestionFailure", () => {
      Socket.off("getQuestionsSuccess");
      alert("Could not retrieve questions!");
    });
  };

  /**
   * @function
   * @summary Updates the states for the answers to re-render the
   * screen for the next question
   */
  nextQuestion = () => {
    var currentQuestion = this.state.currentQuestion;
    var questions = this.state.questions;

    var tmpAnswers = [
      questions[currentQuestion]?.wrong1,
      questions[currentQuestion]?.wrong2,
      questions[currentQuestion]?.correct,
    ];

    //Shuffles alternatives
    var answers = [];
    var startLength = tmpAnswers.length;
    for (var i = 0; i < startLength; i++) {
      var n = Math.floor(Math.random() * tmpAnswers.length);
      var randomAlternative = tmpAnswers.splice(n, 1)[0];
      answers.push(randomAlternative);
    }

    //Update alternatives and question
    this.setState({
      question: questions[currentQuestion]?.question,
      randomAlternatives: answers,
      currentQuestion: currentQuestion + 1,
    });
    if (currentQuestion === questions.length) {
      //TODO: Sum score and add to database
      this.props.navigation.navigate("Home");
    }
  };

  /**
   * @summary checks if a given answer is correct
   * @param {String} answer Answer to check
   * @returns {Boolean} true if answer is correct, false if not
   */
  checkAnswer = (answer) => {
    var currentQuestion = this.state.currentQuestion - 1;
    if (this.state.questions[currentQuestion]?.correct === answer) {
      //TODO: Update current score
      alert("Correct answer!");
      return true;
    } else {
      alert("Wrong answer!");
      return false;
    }
  };

  render() {
    if (this.state.currentQuestion === this.state.questions.length + 1)
      return null;
    else
      return (
        <SafeAreaView style={styleSheets.MainContainer}>
          <Toolbar title="Real Deal" />
          <QuestionButton />
          <Text
            style={styles.numberQ}
          >{`${this.state.currentQuestion}/${this.state.questions.length}`}</Text>
          <LinearGradient
            colors={theme.PINK_GRADIENT}
            style={styles.button_pink}
          >
            <Text style={styles.button_pink}>{this.state.question}</Text>
          </LinearGradient>
          <LinearGradient
            colors={theme.BLUE_GRADIENT}
            style={styles.button_blue}
          >
            <TouchableOpacity
              onPress={() => {
                this.checkAnswer(this.state.randomAlternatives[0]);
                this.nextQuestion();
              }}
            >
              <Text style={styles.button_blue}>
                {this.state.randomAlternatives[0]}
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={theme.BLUE_GRADIENT}
            style={styles.button_blue}
          >
            <TouchableOpacity
              onPress={() => {
                this.checkAnswer(this.state.randomAlternatives[1]);
                this.nextQuestion();
              }}
            >
              <Text style={styles.button_blue}>
                {this.state.randomAlternatives[1]}
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={theme.BLUE_GRADIENT}
            style={styles.button_blue}
          >
            <TouchableOpacity
              onPress={() => {
                this.checkAnswer(this.state.randomAlternatives[2]);
                this.nextQuestion();
              }}
            >
              <Text style={styles.button_blue}>
                {this.state.randomAlternatives[2]}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </SafeAreaView>
      );
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
});

export default NewsQ;
