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
      shuffledAlternatives: [], // All alternatives, shuffled
      correctAnswers: [], // All correct answers in order
      questions: [], // All questions (without the answers)
      userAnswers: [], //The buttons pressed by the user
      currentAlternatives: [], //The currently displayed alternatives
      currentQuestion: 0,
      buttonColour1: theme.BLUE_GRADIENT,
      buttonColour2: theme.BLUE_GRADIENT,
      buttonColour3: theme.BLUE_GRADIENT,
      buttonColour4: theme.BLUE_GRADIENT,
    };
  }

  componentDidMount() {
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
    // FIXME: Should always check if there are any questions, right now we can enter the quiz even if we have none
    Socket.on("getQuestionsArticleFailure", () => {
      Socket.off("getQuestionsArticleSuccess");
      this.props.navigation.goBack();
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
      currentQuestion: this.state.currentQuestion - 1,
    });
    this.displayPress(this.state.userAnswers[this.state.currentQuestion - 1]);
  };

  /**
   * @function
   * @summary Updates the states for the displayed alternatives
   */
  updateCurrentAlternatives() {
    var currentQuestion = this.state.currentQuestion;
    var tmpCurrentAlternatives = [];

    tmpCurrentAlternatives.push(
      this.state.shuffledAlternatives[currentQuestion][0],
      this.state.shuffledAlternatives[currentQuestion][1],
      this.state.shuffledAlternatives[currentQuestion][2],
      this.state.shuffledAlternatives[currentQuestion][3]
    );
    this.setState({
      currentAlternatives: tmpCurrentAlternatives,
    });
  }

  /**
   * @function
   * @summary locks in the number of the button pressed as an answer
   * @param {Integer} buttonNumber number to lock in
   */
  saveAnswer(buttonNumber) {
    var tmpAnswers = this.state.userAnswers;
    tmpAnswers[this.state.currentQuestion] = buttonNumber;
    this.setState({ userAnswers: tmpAnswers });
  }

  /**
   * @function
   * @summary changes colour of the button pressed
   * @param {Integer} buttonNumber number of the button pressed
   */
  displayPress(buttonNumber) {
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
    if (!questions) return;
    var shuffledAlternatives = [];
    var correctAnswers = [];
    var questions2 = [];
    for (const question of questions) {
      var shuffleAnswers = this.shuffleAnswers([
        question.correct,
        question.wrong1,
        question.wrong2,
        question.wrong3,
      ]);
      shuffledAlternatives.push(shuffleAnswers);
      correctAnswers.push(question.correct);
      questions2.push(question.question);
    }
    await this.setState({
      shuffledAlternatives: shuffledAlternatives,
      correctAnswers: correctAnswers,
      questions: questions2,
    });
    this.updateCurrentAlternatives();
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
    var userAnswers = this.state.userAnswers;
    var correctAnswers = this.state.correctAnswers;
    var alternatives = this.state.shuffledAlternatives;

    /* Can't check only length here because we may insert an element at 
    index 4 for example and if index 3 is not yet inserted, it will be 
    filled with an undefined element. */
    if (
      userAnswers.includes(undefined) ||
      userAnswers.length !== correctAnswers.length
    ) {
      alert("You have not answered all questions!");
      return;
    }

    var numberOfCorrectAnswers = 0;
    for (var i = 0; i < userAnswers.length; i++) {
      var currentAlternatives = alternatives[i];

      //Users answers are indexed from 1-4 so we need to subtract 1
      var currentAnswer = userAnswers[i] - 1;
      if (currentAlternatives[currentAnswer] === correctAnswers[i]) {
        numberOfCorrectAnswers++;
      }
    }
    //TODO: Replace this with adding score to the database
    alert(numberOfCorrectAnswers + "/" + correctAnswers.length + " correct!");

    /* We should add this line back in the future when we 
    replace the alert with score added to the database */
    //this.props.navigation.navigate("GameScreen");
  }

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <QuestionButton />
        <View style={styles.PlayerCountContainer}>
          <Text style={styles.Text}>
            {"Player count: " + this.state.playerCount}
          </Text>
        </View>

        <View style={styles.NumberQContainer}>
          <Text style={styles.NumberQ}>{`${this.state.currentQuestion + 1}/${
            this.state.questions.length
          }`}</Text>
        </View>

        <View style={styles.QuestionContainer}>
          <LinearGradient colors={theme.PINK_GRADIENT} style={styles.Gradient}>
            <Text style={styles.ButtonText}>
              {this.state.questions[this.state.currentQuestion]}
            </Text>
          </LinearGradient>
        </View>

        <View style={styles.AlternativeContainer}>
          <TouchableOpacity
            onPress={() => {
              this.saveAnswer(1);
              this.displayPress(1);
            }}
            style={styles.Button}
          >
            <LinearGradient
              colors={this.state.buttonColour1}
              style={styles.Gradient}
            >
              <Text style={styles.ButtonText}>
                {this.state.currentAlternatives[0]}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.saveAnswer(2);
              this.displayPress(2);
            }}
            style={styles.Button}
          >
            <LinearGradient
              colors={this.state.buttonColour2}
              style={styles.Gradient}
            >
              <Text style={styles.ButtonText}>
                {this.state.currentAlternatives[1]}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.saveAnswer(3);
              this.displayPress(3);
            }}
            style={styles.Button}
          >
            <LinearGradient
              colors={this.state.buttonColour3}
              style={styles.Gradient}
            >
              <Text style={styles.ButtonText}>
                {this.state.currentAlternatives[2]}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.saveAnswer(4);
              this.displayPress(4);
            }}
            style={styles.Button}
          >
            <LinearGradient
              colors={this.state.buttonColour4}
              style={styles.Gradient}
            >
              <Text style={styles.ButtonText}>
                {this.state.currentAlternatives[3]}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignItems: "center",
            width: "40%",
          }}
        >
          {this.state.currentQuestion < this.state.questions.length - 1 ? (
            <TouchableOpacity
              onPress={async () => {
                await this.nextQuestion();
                this.updateCurrentAlternatives();
              }}
              style={styles.ArrowButton}
            >
              <Text style={styles.Arrow}>→</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                this.submitAnswers();
              }}
              style={styles.ArrowButton}
            >
              <Text style={styles.Arrow}>Submit</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={async () => {
              await this.previousQuestion();
              this.updateCurrentAlternatives();
            }}
            style={styles.ArrowButton}
          >
            <Text style={styles.Arrow}>←</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  PlayerCountContainer: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  QuestionContainer: {
    height: "20%",
    width: "95%",
    alignItems: "center",
  },
  AlternativeContainer: {
    height: "40%",
    width: "95%",
    alignItems: "center",
  },
  Gradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.ROUNDING_SMALL,
  },
  ButtonText: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: "#FFFFFF",
  },
  Button: {
    width: "100%",
    height: "20%",
    marginTop: theme.MARGIN_SMALL,
  },
  ArrowButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  Arrow: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: theme.DEFAULT_FONT,
    color: "#FFFFFF",
  },
  NumberQContainer: {
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  NumberQ: {
    color: "#FFFFFF",
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
  },
  Text: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
});

export default ArtQ;
