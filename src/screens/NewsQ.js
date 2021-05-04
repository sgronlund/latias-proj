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

//Starting time
const totalTime = 20;

/* We divide by this number to always get a maximum extra,
time score of 5, regardless of what totalTime we have */
const divideToGetMaximumFive = totalTime / 5;

//Decrement timer by 0.1
const decrementStep = 0.1;

//1000 ms
const delayNewQuestion = 1000;

//Amount of extra score if user answered all questions correctly
const extraScoreAllCorrect = 30;

class NewsQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      randomAlternatives: [],
      doneArr: [], //Contains the users answer to every question and the color matching their answer
      question: "",
      currentQuestion: 0,
      time: totalTime,
      buttonColour1: theme.BLUE_GRADIENT,
      buttonColour2: theme.BLUE_GRADIENT,
      buttonColour3: theme.BLUE_GRADIENT,
      disableButtons: false,
      correctAnswers: 0,
    };
  }

  /**
   * @function
   * @summary calls function before component is rendered
   */
  async componentDidMount() {
    this.getQuestions();
    this.startTimer();
  }

  /**
   * @function
   * @summary Runs code every 100ms
   */
  startTimer = async () => {
    this.clockCall = setInterval(() => {
      this.decrementTime();
    }, 100);
  };

  /**
   * @summary decrement the time state
   */
  decrementTime() {
    /* This code keeps running during the timeout even if we clear the 
    interval and try to stop the timer. The timer will be stopped once
    the timeout has completed (await doesn't help). Therefore, we need 
    to restart the timer inside of the setTimeout function, else the 
    timer is started 10 times. */
    if (this.state.time.toFixed(1) <= 0) {
      this.setState({ disableButtons: true });
      this.checkAnswer();
      clearInterval(this.clockCall);
      setTimeout(() => {
        this.nextQuestion();
        this.startTimer();
        this.setState({ disableButtons: false });
      }, delayNewQuestion);
      return;
    }
    this.setState({ time: this.state.time - decrementStep });
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
    Socket.on("getQuestionsFailure", () => {
      Socket.off("getQuestionsSuccess");
      alert("Could not retrieve questions!");
    });
  };

  /**
   * @function
   * @summary shuffles answers from an array
   * @param {[{String}]} randomAlternatives array containing all answers in order, with the correct answer as the last element
   * to be shuffled
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

  /**
   * @summary Calculates total score for users answers
   * @returns {Integer} total score
   */
  calculateScoreTotal() {
    var totalScore = 0;
    var numberOfCorrectAnswers = 0
    for (const question of this.state.doneArr) {
      if (question.answerColor === theme.GREEN_GRADIENT) {
        numberOfCorrectAnswers++;
        //5 + (0 to 5)
        totalScore +=
          5 + parseFloat(question.timeLeft) / divideToGetMaximumFive;
      }
    }

    if(numberOfCorrectAnswers === this.state.questions.length) {
      totalScore += extraScoreAllCorrect;
    }
    return Math.floor(totalScore);
  }

  /**
   * @function
   * @summary Updates the states for the answers to re-render the
   * screen for the next question
   */
  nextQuestion = () => {
    var currentQuestion = this.state.currentQuestion;
    var questions = this.state.questions;

    //Shuffle alternatives
    var answers = this.shuffleAnswers([
      questions[currentQuestion]?.wrong1,
      questions[currentQuestion]?.wrong2,
      questions[currentQuestion]?.correct,
    ]);

    //Update alternatives and question
    this.setState({
      question: questions[currentQuestion]?.question,
      randomAlternatives: answers,
      currentQuestion: currentQuestion + 1,
      time: totalTime,
      buttonColour1: theme.BLUE_GRADIENT,
      buttonColour2: theme.BLUE_GRADIENT,
      buttonColour3: theme.BLUE_GRADIENT,
    });

    //Reached the end of the questions
    if (currentQuestion === questions.length) {
      this.submitScore();
    }
  };

  /**
   * @function
   * @summary submits the score to the database
   */
  submitScore() {
    var totalScore = this.calculateScoreTotal();
    var scoreToBalance = Math.round(totalScore*(-1)/10)
    Socket.emit("submitAnswers", totalScore);
    Socket.emit("changeBalance", Socket.id, scoreToBalance); 
    this.props.navigation.navigate("NewsQDone", {
      numCorrect: this.state.correctAnswers,
      completeGame: this.state.doneArr,
      totalScore: totalScore,
    });
  }

  /**
   * @summary checks if a given answer is correct
   * @param {String} answer Answer to check
   * @param {Integer} buttonNumber the number of the button that was
   * clicked as an answer
   * @returns {Boolean} true if answer is correct, false if not
   */
  checkAnswer = async (answer, buttonNumber) => {
    let correct = false;
    var currentQuestion = this.state.currentQuestion - 1;
    var answerTime = this.state.time.toFixed(2);
    var newStateArr = this.state.doneArr.slice();
    if (!answer) {
      this.setState({
        buttonColour1: theme.ORANGE_GRADIENT,
        buttonColour2: theme.ORANGE_GRADIENT,
        buttonColour3: theme.ORANGE_GRADIENT,
      });
      newStateArr.push({ answerColor: theme.ORANGE_GRADIENT, timeLeft: "-" });
      this.setState({ doneArr: newStateArr });
      return correct;
    }

    if (this.state.questions[currentQuestion].correct === answer) {
      var newScore = this.state.correctAnswers + 1;
      this.setState({ correctAnswers: newScore });
      correct = true;
    }

    //Store the color associated with the answer and the time it took for the user to answer.
    const color = correct ? theme.GREEN_GRADIENT : theme.RED_GRADIENT;
    newStateArr.push({ answerColor: color, timeLeft: answerTime });
    this.setState({ doneArr: newStateArr });

    //No button number means the user has submitted no answer
    if (buttonNumber === 1) {
      this.setState({
        buttonColour1: correct ? theme.GREEN_GRADIENT : theme.RED_GRADIENT,
      });
    } else if (buttonNumber === 2) {
      this.setState({
        buttonColour2: correct ? theme.GREEN_GRADIENT : theme.RED_GRADIENT,
      });
    } else if (buttonNumber === 3) {
      this.setState({
        buttonColour3: correct ? theme.GREEN_GRADIENT : theme.RED_GRADIENT,
      });
    }
    return correct;
  };

  /**
   * @function
   * @summary loads the next question with a time delay
   */
  loadNewQuestionsDelayed() {
    clearInterval(this.clockCall);
    this.setState({ disableButtons: true });
    setTimeout(() => {
      this.nextQuestion();
      this.startTimer();
      this.setState({ disableButtons: false });
    }, delayNewQuestion);
  }

  render() {
    if (this.state.currentQuestion === this.state.questions.length + 1)
      return null;
    else
      return (
        <SafeAreaView style={styleSheets.MainContainer}>
          <View style={styles.NumberQContainer}>
            <Text style={styles.numberQ}>
              {`${this.state.currentQuestion}/${this.state.questions.length}`}
            </Text>
          </View>
          <LinearGradient colors={theme.PINK_GRADIENT} style={styles.Question}>
            <Text style={styles.ButtonText}>{this.state.question}</Text>
          </LinearGradient>
          <View style={styles.AlternativeContainer}>
            <TouchableOpacity
              onPress={async () => {
                this.checkAnswer(this.state.randomAlternatives[0], 1);
                this.loadNewQuestionsDelayed();
              }}
              disabled={this.state.disableButtons}
              style={styles.Button}
            >
              <LinearGradient
                colors={this.state.buttonColour1}
                style={styles.Gradient}
              >
                <Text style={styles.ButtonText}>
                  {this.state.randomAlternatives[0]}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                this.checkAnswer(this.state.randomAlternatives[1], 2);
                this.loadNewQuestionsDelayed();
              }}
              disabled={this.state.disableButtons}
              style={styles.Button}
            >
              <LinearGradient
                colors={this.state.buttonColour2}
                style={styles.Gradient}
              >
                <Text style={styles.ButtonText}>
                  {this.state.randomAlternatives[1]}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                this.checkAnswer(this.state.randomAlternatives[2], 3);
                this.loadNewQuestionsDelayed();
              }}
              disabled={this.state.disableButtons}
              style={styles.Button}
            >
              <LinearGradient
                colors={this.state.buttonColour3}
                style={styles.Gradient}
              >
                <Text style={styles.ButtonText}>
                  {this.state.randomAlternatives[2]}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text style={styles.timerText}>
            {Math.abs(this.state.time).toFixed(1)}
          </Text>
        </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
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
    height: "30%",
    marginTop: theme.MARGIN_SMALL,
  },
  Question: {
    width: "95%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.ROUNDING_SMALL,
    marginTop: theme.MARGIN_SMALL,
  },
  NumberQContainer: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  numberQ: {
    color: "#FFFFFF",
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
  },
  timerText: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
});

export default NewsQ;
