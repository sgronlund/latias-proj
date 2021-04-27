import React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import theme from "../styles/themes";
import { LinearGradient } from "expo-linear-gradient";
import styleSheets from "../styles/StyleSheets";
import QuestionButton from "./components/QuestionButton";
import { Socket } from "../misc/Socket";
import currentWeekNumber from "current-week-number";

class ArtQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerCount: 0,
      shuffledAnswers: [],
      correctAnswers: [],
      questions: [],
      currentQuestion: 0,
      buttonColour1: theme.BLUE_GRADIENT,
      buttonColour2: theme.BLUE_GRADIENT,
      buttonColour3: theme.BLUE_GRADIENT,
      buttonColour4: theme.BLUE_GRADIENT,
      userAnswers: [],
      currentAlternatives: [],
    };
  }

  async componentDidMount() {
    Socket.on("updatePlayerCount", (playerCount) => {
      this.setState({ playerCount: playerCount });
    });
    Socket.emit("quizConnect");
    this.getQuestions();
  }

  componentWillUnmount() {
    Socket.emit("quizDisconnect");
  }

  /**
   * @function
   * @summary Initializes some socket listeners and calls for the
   * server to get the questions for the current week.
   */
  getQuestions = () => {
    Socket.emit("getQuestionsArticle", currentWeekNumber());
    Socket.on("getQuestionsArticleSuccess", (questionsAnswers) => {
      Socket.off("getQuestionsArticleSuccess");
      this.initializeQuestions(questionsAnswers);
    });
    Socket.on("getQuestionsArticleFailure", () => {
      Socket.off("getQuestionsArticleSuccess");
      alert("Could not retrieve questions!");
    });
  };

  /**
   * @function
   * @summary Updates the states for the answers to re-render the
   * screen for the next question
   */
  nextQuestion = () => {
    if (this.state.currentQuestion === this.state.questions.length - 1) return;
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
    });
    this.displayPress(this.state.userAnswers[this.state.currentQuestion + 1]);
  };

  /**
   * @function
   * @summary Updates the states for the answers to re-render the
   * screen for the next question
   */
  previousQuestion = () => {
    if (this.state.currentQuestion === 0) return;
    this.setState({
      // await this???
      currentQuestion: this.state.currentQuestion - 1,
    });
    this.displayPress(this.state.userAnswers[this.state.currentQuestion - 1]);
  };

  updateCurrentQuestion() {
    var currentQuestion = this.state.currentQuestion;

    var tmpCurrentAlternatives = [];
    tmpCurrentAlternatives.push(
      this.state.shuffledAnswers[currentQuestion][0],
      this.state.shuffledAnswers[currentQuestion][1],
      this.state.shuffledAnswers[currentQuestion][2],
      this.state.shuffledAnswers[currentQuestion][3]
    );
    this.setState({
      currentAlternatives: tmpCurrentAlternatives,
    });
  }

  /**
   * @summary checks if a given answer is correct
   * @param {String} buttonNumber number of the button pressed
   * @returns {Boolean} true if answer is correct, false if not
   */
  checkAnswer = async (buttonNumber) => {
    var currentQuestion = this.state.currentQuestion - 1;
    if (
      this.state.shuffledAnswers[buttonNumber] ===
      this.state.correctAnswers[currentQuestion]
    ) {
      return true;
    } else {
      return false;
    }
  };

  /**
   *
   * @param {*} buttonNumber
   */
  saveAnswer(buttonNumber) {
    var tmpAnswers = this.state.userAnswers;
    tmpAnswers[this.state.currentQuestion] = buttonNumber;
    this.setState({ userAnswers: tmpAnswers });
  }

  /**
   *
   * @param {*} buttonNumber
   */
  displayPress(buttonNumber) {
    //Reset all buttons first
    this.setState({
      buttonColour1: theme.BLUE_GRADIENT,
      buttonColour2: theme.BLUE_GRADIENT,
      buttonColour3: theme.BLUE_GRADIENT,
      buttonColour4: theme.BLUE_GRADIENT,
    });

    switch (buttonNumber) {
      case 1:
        this.setState({ buttonColour1: theme.DARK_BLUE_GRADIENT });
        break;
      case 2:
        this.setState({ buttonColour2: theme.DARK_BLUE_GRADIENT });
        break;
      case 3:
        this.setState({ buttonColour3: theme.DARK_BLUE_GRADIENT });
        break;
      case 4:
        this.setState({ buttonColour4: theme.DARK_BLUE_GRADIENT });
        break;
    }
  }

  /**
   * @function
   * @summary Initializes states that are needed to display the
   * questions along with their answers
   * @param {[...]} questions Array containing all questions and answers
   */
  async initializeQuestions(questions) {
    var shuffledAnswers = [];
    var correctAnswers = [];
    var questions2 = [];
    for (const question of questions) {
      var shuffleAnswers = this.shuffleAnswers([
        question.correct,
        question.wrong1,
        question.wrong2,
        question.wrong3,
      ]);
      shuffledAnswers.push(shuffleAnswers);
      correctAnswers.push(question.correct);
      questions2.push(question.question);
    }
    await this.setState({
      shuffledAnswers: shuffledAnswers,
      correctAnswers: correctAnswers,
      questions: questions2,
    });
    this.updateCurrentQuestion();
  }

  /**
   * @function
   * @summary shuffles answers from an array
   * @param {[{String}]} randomAlternatives array containing all
   * answers in order, with the correct answer as the last element
   * @returns {[{String}]} new array with shuffled answers
   */
  shuffleAnswers(randomAlternatives) {
    var answers = [];
    var startLength = randomAlternatives.length;
    for (var i = 0; i < startLength; i++) {
      var n = Math.floor(Math.random() * randomAlternatives.length);
      var randomAlternative = randomAlternatives.splice(n, 1)[0];
      answers.push(randomAlternative);
    }
    return answers;
  }

  submitAnswers() {
    this.props.navigation.navigate("GameScreen");
  }

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <QuestionButton />
        <Text style={styles.Text}>
          {"Player count: " + this.state.playerCount}
        </Text>
        <Text style={styles.numberQ}>{`${this.state.currentQuestion + 1}/${
          this.state.questions.length
        }`}</Text>
        <LinearGradient colors={theme.PINK_GRADIENT} style={styles.button_pink}>
          <Text style={styles.button_pink}>
            {this.state.questions[this.state.currentQuestion]}
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={this.state.buttonColour1}
          style={styles.button_blue}
        >
          <TouchableOpacity
            onPress={() => {
              this.saveAnswer(1);
              this.checkAnswer(1);
              this.displayPress(1);
            }}
          >
            <Text style={styles.button_blue}>
              {this.state.currentAlternatives[0]}
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={this.state.buttonColour2}
          style={styles.button_blue}
        >
          <TouchableOpacity
            onPress={() => {
              this.saveAnswer(2);
              this.checkAnswer(2);
              this.displayPress(2);
            }}
          >
            <Text style={styles.button_blue}>
              {this.state.currentAlternatives[1]}
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={this.state.buttonColour3}
          style={styles.button_blue}
        >
          <TouchableOpacity
            onPress={() => {
              this.saveAnswer(3);
              this.checkAnswer(3);
              this.displayPress(3);
            }}
          >
            <Text style={styles.button_blue}>
              {this.state.currentAlternatives[2]}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={this.state.buttonColour4}
          style={styles.button_blue}
        >
          <TouchableOpacity
            onPress={() => {
              this.saveAnswer(4);
              this.checkAnswer(4);
              this.displayPress(4);
            }}
          >
            <Text style={styles.button_blue}>
              {this.state.currentAlternatives[3]}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {this.state.currentQuestion < this.state.questions.length - 1 ? (
            <TouchableOpacity
              onPress={async () => {
                await this.nextQuestion();
                this.updateCurrentQuestion();
              }}
            >
              <Text style={styles.Arrow}>→</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                this.submitAnswers();
              }}
            >
              <Text
                style={{ fontSize: theme.FONT_SIZE_SMALL, color: "#FFFFFF" }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={async () => {
              await this.previousQuestion();
              this.updateCurrentQuestion();
            }}
          >
            <Text style={styles.Arrow}>←</Text>
          </TouchableOpacity>
        </View>
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
    height: "20%",
    margin: theme.MARGIN_MEDIUM,
    padding: 27,
    borderRadius: theme.ROUNDING_SMALL,
  },
  button_blue: {
    fontSize: 23,
    color: "#FFFFFF",
    textAlign: "center",
    width: "95%",
    height: "10%",
    margin: theme.MARGIN_SMALL,
    padding: 12,
    borderRadius: theme.ROUNDING_SMALL,
  },
  Arrow: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: "#FFFFFF",
  },
  numberQ: {
    color: "#FFFFFF",
    left: 150,
    marginTop: 30,
    marginBottom: -5,
    fontSize: 20,
  },
  Text: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
  ButtonText: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
});

export default ArtQ;
