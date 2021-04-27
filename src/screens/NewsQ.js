import React from "react";
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../styles/themes";
import { LinearGradient } from "expo-linear-gradient";
import styleSheets from "../styles/StyleSheets";
import QuestionButton from "./components/QuestionButton";
import { Socket } from "../misc/Socket";
import currentWeekNumber from "current-week-number";

//Starting time
const totalTime = 5;

//Decrement timer by 0.1
const decrementStep = 0.1;

//1000 ms
const delayNewQuestion = 1000;

class NewsQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      randomAlternatives: [],
      question: "",
      currentQuestion: 0,
      time: totalTime,
      buttonColour1: theme.BLUE_GRADIENT,
      buttonColour2: theme.BLUE_GRADIENT,
      buttonColour3: theme.BLUE_GRADIENT,
      disableButtons: false,
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
    if (this.state.time < 0) {
      this.checkAnswer();
      clearInterval(this.clockCall);
      setTimeout(() => {
        this.nextQuestion();
        this.startTimer();
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
      //TODO: Sum score and add to database
      this.props.navigation.navigate("GameScreen");
    }
  };

  /**
   * @summary checks if a given answer is correct
   * @param {String} answer Answer to check
   * @param {Integer} buttonNumber the number of the button that was
   * clicked as an answer
   * @returns {Boolean} true if answer is correct, false if not
   */
  checkAnswer = async (answer, buttonNumber) => {
    let correct = false;
    if (!answer) {
      this.setState({
        buttonColour1: theme.ORANGE_GRADIENT,
        buttonColour2: theme.ORANGE_GRADIENT,
        buttonColour3: theme.ORANGE_GRADIENT,
      });
      return correct;
    }

    var currentQuestion = this.state.currentQuestion - 1;
    if (this.state.questions[currentQuestion].correct === answer) {
      correct = true;
    }

    //No button number means the user has submitted no answer
    switch (buttonNumber) {
      case 1:
        this.setState({
          buttonColour1: correct ? theme.GREEN_GRADIENT : theme.RED_GRADIENT,
        });
        break;
      case 2:
        this.setState({
          buttonColour2: correct ? theme.GREEN_GRADIENT : theme.RED_GRADIENT,
        });
        break;
      case 3:
        this.setState({
          buttonColour3: correct ? theme.GREEN_GRADIENT : theme.RED_GRADIENT,
        });
        break;
    }
    return correct;
  };
  
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
            colors={this.state.buttonColour1}
            style={styles.button_blue}
          >
            <TouchableOpacity
              onPress={async () => {
                this.checkAnswer(this.state.randomAlternatives[0], 1);
                this.loadNewQuestionsDelayed();
              }}
              disabled={this.state.disableButtons}
            >
              <Text style={styles.button_blue}>
                {this.state.randomAlternatives[0]}
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={this.state.buttonColour2}
            style={styles.button_blue}
          >
            <TouchableOpacity
              onPress={async () => {
                this.checkAnswer(this.state.randomAlternatives[1], 2);
                this.loadNewQuestionsDelayed();
              }}
              disabled={this.state.disableButtons}
            >
              <Text style={styles.button_blue}>
                {this.state.randomAlternatives[1]}
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={this.state.buttonColour3}
            style={styles.button_blue}
          >
            <TouchableOpacity
              onPress={async () => {
                this.checkAnswer(this.state.randomAlternatives[2], 3);
                this.loadNewQuestionsDelayed();
              }}
              disabled={this.state.disableButtons}
            >
              <Text style={styles.button_blue}>
                {this.state.randomAlternatives[2]}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <Text style={styles.timerText}>
            {
              //Absolute value because 0.0 is shown as -0.0, probably
              //because it is actually something like -0.000000000001
              Math.abs(this.state.time).toFixed(1)
            }
          </Text>
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
  timerText: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
});

export default NewsQ;
