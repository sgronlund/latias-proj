import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, Text } from "react-native";
import QuestionButton from "./components/QuestionButton.js";
import Shop from "./components/Shop.js";
import theme from "../styles/themes.js";
import styleSheets from "../styles/StyleSheets.js";
import LoginContainer from "./components/LoginContainer";
import Socket from "../misc/Socket";

/**
 * @summary This represents the settings screen. The user
 * can disable sound, check user policy, enter a new
 * password or log out from here.
 */
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, username: null };
  }

  componentDidMount() {
    Socket.on("returnUserSuccess", (username) => {
      this.setState({ loggedIn: true, username: username });
    });
    Socket.emit("getUser", Socket.id);
  }

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <TouchableOpacity style={styles.Button}>
          <Text style={styleSheets.ButtonText}>Sound Off</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            this.props.navigation.navigate("UserPolicy");
          }}
        >
          <Text style={styleSheets.ButtonText}>User Policy</Text>
        </TouchableOpacity>
        {this.state.loggedIn ? <LoginContainer /> : null}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Button: {
    width: "70%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.DARK_PURPLE,
    borderRadius: theme.ROUNDING_SMALL,
    margin: theme.MARGIN_MEDIUM,
  },
  NameText: {
    fontSize: 20,
    color: "white",
    fontFamily: theme.DEFAULT_FONT,
  },
});

export default Settings;
