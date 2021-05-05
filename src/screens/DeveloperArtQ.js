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
import { Socket, initDeveloperArtQSockets } from "../misc/Socket";
import currentWeekNumber from "current-week-number";

/**
 * @summary This screen is where the developer can submit
 * questions to the article quiz
 */
class DeveloperArtQ extends React.Component {
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
    initDeveloperArtQSockets();
    Socket.emit(
      "addQuestionArticle",
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
    Socket.emit("resetQuestionsArticle", currentWeekNumber());
    alert("Frågorna har återställts!");
  };

  componenWillUnmount() {
    Socket.off("addQuestionArticleSuccess");
    Socket.off("addQuestionArticleFailure");
  }

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <View style={styles.InputContainer}>
          <Text style={styleSheets.inputHeader}>Fråga:</Text>
          <TextInput
            style={styleSheets.Input}
            placeholder="Fråga"
            onChangeText={this.handleQuestion}
          />
          <Text style={styleSheets.inputHeader}>Svar:</Text>
          <TextInput
            style={styleSheets.Input}
            placeholder="Fel svar"
            onChangeText={this.handleWrongAnswer1}
          />
          <TextInput
            style={styleSheets.Input}
            placeholder="Fel svar"
            onChangeText={this.handleWrongAnswer2}
          />
          <TextInput
            style={styleSheets.Input}
            placeholder="Fel svar"
            onChangeText={this.handleWrongAnswer3}
          />
          <TextInput
            style={styleSheets.Input}
            placeholder="Rätt svar"
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
          <Text style={styleSheets.ButtonText}>SKICKA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.PinkBackground]}
          onPress={this.resetQuestions}
        >
          <Text style={styleSheets.ButtonText}>ÅTERSTÄLL FRÅGOR</Text>
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
});

export default DeveloperArtQ;