import React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import theme from "../styles/themes";
import { LinearGradient } from "expo-linear-gradient";
import styleSheets from "../styles/StyleSheets";
import QuestionButton from "./components/QuestionButton";
import Scoreboard from "./components/Scoreboard";
import { Socket } from "../misc/Socket";
import Shop from "./components/Shop";

class NewsQWaiting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  componentDidMount() {
    this.initSockets();
  }

  componentWillUnmount() {
    Socket.off("returnUserSuccess");
  }

  /**
   * @function
   * @summary initializes socket listeners
   * for the class
   */
  initSockets() {
    Socket.on("returnUserSuccess", () => {
      this.setState({ loggedIn: true });
    });
    Socket.emit("getUser", Socket.id);
  }

  render() {
    const isLoggedIn = this.state.loggedIn;
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <QuestionButton />
        {isLoggedIn ? <Shop /> : null}
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("NewsQ")}
            style={styles.ReadyButton}
          >
            <LinearGradient
              colors={theme.PINK_GRADIENT}
              style={styles.Gradient}
            >
              <Text style={styles.ButtonText}>START</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Text style={styles.TitleText}>────────────────────────</Text>
        <Scoreboard />
      </SafeAreaView>
    );
  }
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

global.responsive = {
  width: width / 4 + height / 4,
  height: width / 4 + height / 4,
  borderRadius: width / 8 + height / 8,
};

const styles = StyleSheet.create({
  Gradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: responsive.borderRadius,
  },
  ButtonText: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: "#FFFFFF",
  },
  scoreboard: {
    width: "100%",
    height: "35%",
    alignItems: "center",
  },
  TitleText: {
    color: "white",
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
  },
  ButtonContainer: {
    height: responsive.height,
    width: responsive.width,
    padding: theme.PADDING_LARGE,
  },
  ReadyButton: {
    width: "100%",
    height: "100%",
    borderRadius: responsive.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  ReadyText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
});

export default NewsQWaiting;
