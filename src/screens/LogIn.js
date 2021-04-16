import React from "react";
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import QuestionButton from "./components/QuestionButton";
import theme from "../styles/themes";
import styleSheets from "../styles/StyleSheets";
import Toolbar from "./components/Toolbar";
import { Socket, initLoginSockets } from "../misc/Socket";

/**
 * @summary This represents the login screen. From here you
 * can either login or press reset password which will lead
 * you to the reset page.
 */
class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", alert: false };
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
   * @summary Tells the server that a user is trying to log in
   * @param {String} username username of the user to log in
   * @param {String} password password of the user to log in
   */
  handleLogin = (username, password) => {
    initLoginSockets(this.props.navigation);
    Socket.emit("login", username, password);
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
        </View>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.PinkBackground]}
          onPress={() =>
            this.handleLogin(this.state.username, this.state.password)
          }
        >
          <Text style={styleSheets.ButtonText}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Reset")}
        >
          <Text style={styles.ForgotPassword}>forgot password?</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  LoginContainer: {
    width: "95%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.DARK_PURPLE,
    borderRadius: theme.ROUNDING_SMALL,
    margin: theme.MARGIN_LARGE,
  },
  ForgotPassword: {
    fontFamily: "Roboto Slab",
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: "#3E9EFE",
    textDecorationLine: "underline",
  },
});

export default LogIn;
