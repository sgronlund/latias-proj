import React from "react";
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import theme from "../styles/themes";
import styleSheets from "../styles/StyleSheets";
import Toolbar from "./components/Toolbar";
import { Socket, initDeveloperSockets } from "../misc/Socket";
import currentWeekNumber from "current-week-number";

/**
 * @summary This represents the login screen. From here you
 * can either login or press reset password which will lead
 * you to the reset page.
 */
class Developer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      wrongAnswer1: "",
      wrongAnswer2: "",
      wrongAnswer3: "",
      correctAnswer: "",
    };
  }

  /**
   * @function
   * @summary Updates the state of the question when the user inputs text
   * @param {String} text text to update username to
   */
  handleQuestion = (text) => {
    this.setState({ question: text });
  };

  /**
   * @function
   * @summary Updates the state of wrong answer number 1 when the user
   * inputs text
   * @param {String} text text to update wrong answer to
   */
  handleWrongAnswer1 = (text) => {
    this.setState({ wrongAnswer1: text });
  };

  /**
   * @function
   * @summary Updates the state of wrong answer number 2 when the user
   * inputs text
   * @param {String} text text to update wrong answer to
   */
  handleWrongAnswer2 = (text) => {
    this.setState({ wrongAnswer2: text });
  };

  /**
   * @function
   * @summary Updates the state of wrong answer number 3 when the user
   * inputs text
   * @param {String} text text to update wrong answer to
   */
  handleWrongAnswer3 = (text) => {
    this.setState({ wrongAnswer3: text });
  };

  /**
   * @function
   * @summary Updates the state of the correct answer when the user
   * inputs text
   * @param {String} text text to update correct answer to
   */
  handleCorrectAnswer = (text) => {
    this.setState({ correctAnswer: text });
  };

  /**
   * @function
   * @summary Tells the server that a user is trying to log in
   * @param {String} username username of the user to log in
   * @param {String} password password of the user to log in
   */
  handleSubmitQuestion = (
    question,
    wrongAnswer1,
    wrongAnswer2,
    wrongAnswer3,
    correctAnswer
  ) => {
    initDeveloperSockets();
    Socket.emit(
      "addQuestion",
      question,
      [wrongAnswer1, wrongAnswer2, wrongAnswer3, correctAnswer],
      currentWeekNumber()
    );
  };

  /**
   * @function
   * @summary Tells the server to remove questions for the
   * current week
   */
  resetQuestions = () => {
    Socket.emit("resetQuestions", currentWeekNumber());
    alert("Questions has been reset!");
  };

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <Toolbar />
        <View style={styles.InputContainer}>
          <Text style={styleSheets.LoginText}>Question:</Text>
          <TextInput
            style={styles.QuestionInput}
            placeholder="Question"
            onChangeText={this.handleQuestion}
          />
          <Text style={styleSheets.LoginText}>Answers:</Text>
          <TextInput
            style={styles.AnswerInput}
            placeholder="Wrong answer"
            onChangeText={this.handleWrongAnswer1}
          />
          <TextInput
            style={styles.AnswerInput}
            placeholder="Wrong answer"
            onChangeText={this.handleWrongAnswer2}
          />
          <TextInput
            style={styles.AnswerInput}
            placeholder="Wrong answer"
            onChangeText={this.handleWrongAnswer3}
          />
          <TextInput
            style={styles.AnswerInput}
            placeholder="Correct answer"
            onChangeText={this.handleCorrectAnswer}
          />
        </View>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.PinkBackground]}
          onPress={() =>
            this.handleSubmitQuestion(
              this.state.question,
              this.state.wrongAnswer1,
              this.state.wrongAnswer2,
              this.state.wrongAnswer3,
              this.state.correctAnswer
            )
          }
        >
          <Text style={styleSheets.ButtonText}>SUBMIT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.PinkBackground]}
          onPress={this.resetQuestions}
        >
          <Text style={styleSheets.ButtonText}>RESET QUESTIONS</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  InputContainer: {
    width: "95%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.DARK_PURPLE,
    borderRadius: theme.ROUNDING_SMALL,
    margin: theme.MARGIN_LARGE,
  },
  QuestionInput: {
    height: 40,
    margin: 12,
    width: "80%",
    borderWidth: 1,
    backgroundColor: "white",
    textAlign: "center",
    borderRadius: theme.ROUNDING_EXTRA_SMALL,
  },
  AnswerInput: {
    height: 40,
    width: "80%",
    borderWidth: 1,
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: theme.ROUNDING_EXTRA_SMALL,
  },
});

export default Developer;
