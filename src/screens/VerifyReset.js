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
import { Socket, initVerifyResetSockets } from "../misc/Socket";

/**
 * @summary This represents the screen for entering the code that
 * you've received in your email to reset your password. On
 * correct reset code input, the user will be sent to the
 * password reset page.
 */
class VerifyReset extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const email = navigation.getParam("email", null);
    this.state = { code: "", email: email };
  }

  /**
   * @function
   * @summary Updates the state of the code when the user inputs text
   * @param {String} text text to update code to
   */
  handleCode = (text) => {
    this.setState({ code: text });
  };

  /**
   * @function
   * @summary Tells the server that a user is submitting their reset code
   * @param {String} code the reset code for resetting the password
   * @param {String} email email of the user
   */
  handleSubmit = (code, email) => {
    initVerifyResetSockets(this.props.navigation, this.state.email);
    Socket.emit("submitCode", code, email);
  };

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
         
        <View style={styles.LoginContainer}>
          <Text style={styles.CodeText}>Code:</Text>
          <TextInput
            style={styleSheets.Input}
            placeholder="Code"
            onChangeText={this.handleCode}
          />
        </View>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.PinkBackground]}
          onPress={() => this.handleSubmit(this.state.code, this.state.email)}
        >
          <Text style={styleSheets.ButtonText}>SUBMIT CODE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.PinkBackground]}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Text style={styleSheets.ButtonText}>CANCEL</Text>
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

export default VerifyReset;
