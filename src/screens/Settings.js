import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, Text } from "react-native";
import QuestionButton from "./components/QuestionButton.js";
import Wallet from "./components/Shop.js";
import theme from "../styles/themes.js";
import styleSheets from "../styles/StyleSheets.js";
import Toolbar from "./components/Toolbar";
import { Socket, initLogoutSockets } from "../misc/Socket";

/**
 * @summary This represents the settings screen. The user
 * can disable sound, check user policy, enter a new
 * password or log out from here.
 */
class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    initLogoutSockets(this.props.navigation);
    Socket.emit("logout", Socket.id);
  };

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <QuestionButton />
        <Toolbar backButton={true} />
        <TouchableOpacity style={styles.Button}>
          <Text style={styleSheets.ButtonText}>Sound Off</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button}>
          <Text style={styleSheets.ButtonText}>User Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            this.props.navigation.navigate("Reset");
          }}
        >
          <Text style={styleSheets.ButtonText}>New Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            this.handleLogout();
          }}
        >
          <Text style={styleSheets.ButtonText}>Log Out</Text>
        </TouchableOpacity>
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
