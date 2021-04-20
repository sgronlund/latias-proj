import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, Text } from "react-native";
import QuestionButton from "./components/QuestionButton.js";
import Wallet from "./components/Shop.js";
import theme from "../styles/themes.js";
import styleSheets from "../styles/StyleSheets.js";
import Toolbar from "./components/Toolbar";
import LoginContainer from "./components/LoginContainer";
import { View, Socket, initLogoutSockets } from "../misc/Socket";

/**
 * @summary This represents the settings screen. The user
 * can disable sound, check user policy, enter a new
 * password or log out from here.
 */
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  componentDidMount() {
    Socket.on("returnUserSuccess", (username) => {
      this.setState({ loggedIn: true });
    });
    Socket.emit("getUser", Socket.id);
  }

  // TouchableOpactity måste ha en view kring sig och det går inte att ha flera SafeAreaView utan det måste vara en vanlig view :)))))))))))))))))))))))))))))))))))))))))))
  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <QuestionButton />
        <Wallet />
        <TouchableOpacity style={styles.Button}>
          <Text style={styleSheets.ButtonText}>Sound Off</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button}>
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
});

export default Settings;
