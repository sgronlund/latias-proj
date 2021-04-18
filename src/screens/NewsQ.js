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
import { Socket, initNewsQSockets } from "../misc/Socket";
import currentWeekNumber from "current-week-number"


class NewsQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = { questions: [], question: "", wrongAnswer1: "", wrongAnswer2: "", wrongAnswer3: "", correctAnswer: "", currentQuestion: 0}
  }

  /**
   * @function
   * @summary calls function before component is rendered
   */
  componentDidMount() {
    //Cannot call this in the constructor since React-Native 
    //does not allow changing states in the constructor.
    this.getQuestions();
  }

  /**
   * @function
   * @summary Initializes some socket listeners and calls for the
   * server to get the questions for the current week.
   */
  getQuestions = () => {
    //Need to send a reference to the class itself 
    //since we call some of it's functions
    initNewsQSockets(this);
    Socket.emit("getQuestions", currentWeekNumber());
  }

  /**
   * @function
   * @summary Updates the states for the answers to re-render the
   * screen for the next question
   */
  nextQuestion = () => {
    //TODO: Randomize questions, right now the 
    //correct answer is always in the same spot
    var currentQuestion = this.state.currentQuestion;
    var questions = this.state.questions;
    this.setState({ question: questions[currentQuestion]?.question,
                    wrongAnswer1: questions[currentQuestion]?.wrong1,
                    wrongAnswer2: questions[currentQuestion]?.wrong2, 
                    wrongAnswer3: questions[currentQuestion]?.wrong3, 
                    correctAnswer: questions[currentQuestion]?.correct,
                    currentQuestion: (currentQuestion + 1)});
    if(currentQuestion === 10) {
      //TODO: Add score
      this.props.navigation.navigate("Home");
    }
  }

  render() {
      return (
        <SafeAreaView style={styleSheets.MainContainer}>
          <Toolbar />
          <QuestionButton />
          <Text style={styles.numberQ}>{`${this.state.currentQuestion}/10`}</Text>
          <LinearGradient colors={theme.PINK_GRADIENT} style={styles.button_pink}>
            <Text style={styles.button_pink}>{this.state.question}</Text>
          </LinearGradient>
    
          <LinearGradient colors={theme.BLUE_GRADIENT} style={styles.button_blue}>
            <TouchableOpacity onPress = {this.nextQuestion}>
              <Text style={styles.button_blue}>{this.state.wrongAnswer1}</Text>
            </TouchableOpacity>
          </LinearGradient>
    
          <LinearGradient colors={theme.BLUE_GRADIENT} style={styles.button_blue}>
            <TouchableOpacity onPress = {this.nextQuestion}>
              <Text style={styles.button_blue}>{this.state.wrongAnswer2}</Text>
            </TouchableOpacity>
          </LinearGradient>
    
          <LinearGradient colors={theme.BLUE_GRADIENT} style={styles.button_blue}>
            <TouchableOpacity onPress = {this.nextQuestion}>
              <Text style={styles.button_blue}>{this.state.wrongAnswer3}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </SafeAreaView>
      );
  }
};

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
  ansContainer: {
    backgroundColor: theme.DARK_PURPLE,
    width: "90%",
    margin: theme.MARGIN_LARGE,
    padding: 50,
    borderRadius: theme.ROUNDING_SMALL,
  },
});

export default NewsQ;
