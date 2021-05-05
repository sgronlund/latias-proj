import React from "react";
import styleSheets from "../../styles/StyleSheets.js";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { withNavigation } from "react-navigation";
import theme from "../../styles/themes";
import { Socket, initLogoutSockets } from "../../misc/Socket";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * @function
   * @summary initializes listeners for checking successful logut and
   * tells the server that the client wants to log out
   */
  handleLogout = () => {
    initLogoutSockets(this.props.navigation);
    Socket.emit("logout", Socket.id);
  };

  render() {
    return (
      <>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            this.props.navigation.navigate("Reset");
          }}
        >
          <Text style={styleSheets.ButtonText}>Nytt Lösenord</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            this.handleLogout();
          }}
        >
          <Text style={styleSheets.ButtonText}>Logga Ut</Text>
        </TouchableOpacity>
      </>
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

export default withNavigation(LoginContainer);
