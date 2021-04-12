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
import Socket from "./Socket";

/**
 * @brief This represents the screen for updating a users password
 */
class updatePassword extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const email = navigation.getParam("email", null);
    console.log(email);
    this.state = { password: "", passwordConfirm: "", email: email };
  }

  /**
   * Updates the state of the password when the user inputs text
   * @param {String} text text to update code to
   */
  handlePassword = (text) => {
    this.setState({ password: text });
  };

  /**
   * Updates the state of the password confirmation when the user inputs text
   * @param {String} text text to update the password confirmation to
   */
  handlePasswordConfirm = (text) => {
    this.setState({ passwordConfirm: text });
  };

  /**
   * @brief Tells the server to update the password for a user
   * @details If the user inputs two passwords that are not the same, the
   * user is notified of this and needs to re-enter the passwords
   * @param {String} password the new password
   * @param {String} passwordConfirm the new password (confirm)
   */
  updatePassword = (password, passwordConfirm) => {
    if (password !== passwordConfirm)
      return alert("Passwords are not the same");
    Socket.emit("updatePass", this.state.email, password);
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <QuestionButton />
        <Toolbar />
        <View style={styles.LoginContainer}>
          <Text style={styleSheets.LoginText}>New Password:</Text>
          <TextInput
            style={styleSheets.Input}
            placeholder="new password"
            onChangeText={this.handlePassword}
          />
          <Text style={styleSheets.LoginText}>Confirm Password:</Text>
          <TextInput
            style={styleSheets.Input}
            placeholder="new password"
            onChangeText={this.handlePasswordConfirm}
          />
        </View>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.PinkBackground]}
          onPress={() =>
            this.updatePassword(this.state.password, this.state.passwordConfirm)
          }
        >
          <Text style={styleSheets.ButtonText}>CONFIRM</Text>
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

export default updatePassword;
