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
      onLastQuestion: false,
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
    Socket.on("getQuestionsArticleSuccess", (questionsAnswers) => {
      Socket.off("getQuestionsArticleSuccess");
      Socket.off("getQuestionsArticleFailure");
      this.initializeQuestions(questionsAnswers);
    });
    Socket.on("getQuestionsArticleFailure", () => {
      Socket.off("getQuestionsArticleFailure");
      Socket.off("getQuestionsArticleSuccess");
      this.props.navigation.goBack();
      alert("Kunde inte hämta frågorna!");
    });
    Socket.on("changeScreenFinishedArtQ", () => {
      this.props.navigation.navigate("EndScreen");
    });
    Socket.emit("getQuestionsArticle", currentWeekNumber());
  };

  /**
   * @function
   * @summary Updates the states for the answers to re-render the
   * screen for the next question
   */
  nextQuestion = () => {
    const newQuestion = this.state.currentQuestion + 1;

    if (this.state.currentQuestion === this.state.questions.length - 1) return;
    this.setState({
      currentQuestion: newQuestion,
    });
    this.displayPress(this.state.userAnswers[this.state.currentQuestion + 1]);

    if (newQuestion === this.state.questions.length - 1) {
      this.setState({ onLastQuestion: true });
    }
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
      onLastQuestion: false,
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
    var singleQuestion = questions2.length === 1;
    await this.setState({
      shuffledAlternatives: shuffledAlternatives,
      correctAnswers: correctAnswers,
      questions: questions2,
      onLastQuestion: singleQuestion,
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
      alert("Du har inte svarat på alla frågor!");
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
    var score;
    var newBalance;
    if (numberOfCorrectAnswers === this.state.questions.length) {
      score = 750;
    } else {
      score = 50 * numberOfCorrectAnswers;
    }

    /* Here we take a negative value so that we'll increase the balance 
    instead of decrease, because we always subtract balance on the backend */

    var newBalance = -score / 10;

    Socket.emit("changeBalance", Socket.id, newBalance);
    Socket.emit("submitAnswersArticle", score);
  }

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <View style={styles.PlayerCountContainer}>
          <Text style={styles.Text}>
            {"Antal Spelare: " + this.state.playerCount}
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
            style={[styles.Button, { marginLeft: theme.MARGIN_TINY }]}
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
        </View>
        <View style={styles.AlternativeContainer}>
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
            style={[styles.Button, { marginLeft: theme.MARGIN_TINY }]}
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

        <View style={styles.ArrowContainer}>
          {this.state.onLastQuestion ? (
            <TouchableOpacity
              onPress={() => {
                this.submitAnswers();
              }}
              style={styles.SubmitButton}
            >
              <LinearGradient
                colors={theme.GREEN_GRADIENT}
                style={styles.Gradient}
              >
                <Text style={styles.SubmitText}>Skicka</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={async () => {
                await this.nextQuestion();
                this.updateCurrentAlternatives();
              }}
              style={styles.ArrowButton}
            >
              <Text style={styles.Arrow}>→</Text>
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
    height: "7%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  QuestionContainer: {
    height: "20%",
    width: "90%",
    alignItems: "center",
    marginBottom: theme.MARGIN_TINY,
  },
  AlternativeContainer: {
    height: "17%",
    alignItems: "center",
    width: "90%",
    flexDirection: "row",
    margin: theme.MARGIN_EXTRA_TINY,
    justifyContent: "space-evenly",
  },
  Gradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.ROUNDING_EXTRA_SMALL,
    padding: theme.PADDING_SMALL,
    textAlign: "center",
  },
  ButtonText: {
    fontSize: theme.FONT_SIZE_TINY,
    fontFamily: theme.DEFAULT_FONT,
    color: "#FFFFFF",
  },
  Button: {
    flex: 2,
    height: "95%",
  },
  SubmitButton: {
    width: "30%",
    height: "60%",
  },
  SubmitText: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    fontFamily: theme.DEFAULT_FONT,
    color: "#FFFFFF",
  },
  ArrowContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: "12%",
    backgroundColor: "#081842",
    borderRadius: theme.ROUNDING_EXTRA_SMALL,
    paddingLeft: theme.PADDING_LARGE,
    paddingRight: theme.PADDING_LARGE,
    margin: theme.MARGIN_TINY,
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
    margin: theme.MARGIN_EXTRA_TINY,
  },
  NumberQ: {
    color: "#FFFFFF",
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
  },
  Text: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
});

export default ArtQ;
