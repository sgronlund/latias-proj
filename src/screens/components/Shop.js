import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../styles/themes.js";
import { withNavigation } from "react-navigation";
import Socket from "../../misc/Socket";

/**
 * @summary This is a component which leads the user to
 * the shop screen.
 */
class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { balance: null };
  }

  componentDidMount() {
    Socket.on("returnBalanceSuccess", (balance) => {
      this.setState({ balance: balance });
    });

    //felhantering
    Socket.on("returnBalanceFailure", () => {
      this.setState({ balance: -1 });
    });

    Socket.emit("getBalance", Socket.id);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.Container}
        onPress={() => this.props.navigation.navigate("ShopScreen")}
      >
        <Text style={styles.Text}>{this.state.balance} $</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    //width: 80,
    //height: 30,
    paddingHorizontal: "5%",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.MARGIN_MEDIUM,
    bottom: 0,
  },
  Text: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: "white",
    fontFamily: "Roboto Slab",
  },
});

export default withNavigation(Shop);
