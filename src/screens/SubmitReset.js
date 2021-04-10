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

class SubmitReset extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const email = navigation.getParam("email", null);
    this.state = { code: "", email: email };
  }

  handleCode = (text) => {
    this.setState({ code: text });
  };

  initSockets() {
    Socket.on("codeFailure", () => {
      alert("Wrong code!");
    });
    Socket.on("codeSuccess", () => {
      this.props.navigation.navigate("UpdatePassword", {
        email: this.state.email,
      });
    });
  }

  handleSubmit = (code, email) => {
    this.initSockets();
    Socket.emit("submitCode", code, email);
  };

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <QuestionButton />
        <Toolbar />
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

export default SubmitReset;
