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
import { Socket, initResetSockets } from "../misc/Socket";

/**
 * @summary This represents the screen for entering your email
 * that you want the reset code to be sent to. The email must
 * match a user in the database.
 */
class Reset extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "" };
  }

  /**
   * @function
   * @summary Updates the state of the email when the user inputs text
   * @param {String} text text to update the email to
   */
  handleEmail = (text) => {
    this.setState({ email: text });
  };

  /**
   * @function
   * @summary Tells the server that a user is trying reset their password
   * @param {String} email email of the user trying to reset password
   */
  handleSubmit = (email) => {
    initResetSockets(this.props.navigation, this.state.email);
    Socket.emit("resetPass", email);
  };

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <Toolbar backButton={true} />
        <View style={styles.LoginContainer}>
          <Text style={styles.CodeText}>Email:</Text>
          <TextInput
            style={styleSheets.Input}
            placeholder="Email"
            onChangeText={this.handleEmail}
          />
        </View>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.PinkBackground]}
          onPress={() => {
            this.handleSubmit(this.state.email);
          }}
        >
          <Text style={styleSheets.ButtonText}>SEND MAIL</Text>
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
  CodeText: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: "white",
    fontFamily: theme.DEFAULT_FONT,
  },
});

export default Reset;
