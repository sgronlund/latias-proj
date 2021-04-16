import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import QuestionButton from "./components/QuestionButton";
import theme from "../styles/themes";
import styleSheets from "../styles/StyleSheets";
import Toolbar from "./components/Toolbar";
import { Socket, initSignupSockets } from "../misc/Socket";

/**
 * @summary This represents the signup screen. From here you enter
 * a username, password and an email to create an account. A user
 * can not enter a username or email that is already in the database.
 */
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", email: "" };
  }

  /**
   * @function
   * @summary Updates the state of the username when the user inputs text
   * @param {String} text text to update username to
   */
  handleUsername = (text) => {
    this.setState({ username: text });
  };

  /**
   * @function
   * @summary Updates the state of the password when the user inputs text
   * @param {String} text text to update password to
   */
  handlePassword = (text) => {
    this.setState({ password: text });
  };

  /**
   * @function
   * @summary Updates the state of the email when the user inputs text
   * @param {String} text text to update email to
   */
  handleEmail = (text) => {
    this.setState({ email: text });
  };

  /**
   * @function
   * @summary Tells the server that a user is trying to register
   * @param {String} username username of the user to register
   * @param {String} password password of the user to register
   * @param {String} email email of the user to register
   */
  handleRegister = (username, password, email) => {
    initSignupSockets(this.props.navigation);
    Socket.emit("register", username, password, email);
  };

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <QuestionButton />
        <Toolbar />
        <View style={styles.LoginContainer}>
          <Text style={styleSheets.LoginText}>Username:</Text>
          <TextInput
            style={styleSheets.Input}
            placeholder="your username"
            onChangeText={this.handleUsername}
          />
          <Text style={styleSheets.LoginText}>Password:</Text>
          <TextInput
            style={styleSheets.Input}
            placeholder="your password"
            onChangeText={this.handlePassword}
          />
          <Text style={styleSheets.LoginText}>Email:</Text>
          <TextInput
            style={styleSheets.Input}
            placeholder="your email"
            onChangeText={this.handleEmail}
          />
        </View>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.LightBlueBackground]}
          onPress={() =>
            this.handleRegister(
              this.state.username,
              this.state.password,
              this.state.email
            )
          }
        >
          <Text style={styleSheets.ButtonText}>REGISTER</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  LoginContainer: {
    width: "95%",
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.DARK_PURPLE,
    borderRadius: theme.ROUNDING_SMALL,
    margin: theme.MARGIN_LARGE,
  },
});

export default Signup;
