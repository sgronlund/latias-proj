import React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import theme from "../styles/themes";
import { LinearGradient } from "expo-linear-gradient";
import styleSheets from "../styles/StyleSheets";
import QuestionButton from "./components/QuestionButton";
import Scoreboard from "./components/Scoreboard";
import { Socket } from "../misc/Socket";
import Shop from "./components/Shop";

class ArtQWaiting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: false};
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
    return (
    <SafeAreaView style={styleSheets.MainContainer}>
        <View style={styles.readyContainer}>
        <LinearGradient
            colors={theme.PINK_GRADIENT}
            style={styles.ReadyButton}
        >
            <TouchableOpacity
            style={styles.ReadyButton}
            onPress={() => this.props.navigation.navigate("NewsQ")}
            >
            <Text style={styles.ReadyText}>START</Text>
            </TouchableOpacity>
        </LinearGradient><Text style={styles.TitleText}>
            ────────────────────────
        </Text>
        </View>
        <View style={styles.scoreboard}>
        <Scoreboard/>
        </View>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scoreboard: {
    //flex: 0,
    //flexWrap: 0,
    //flexGrow: 0,
    //flexDirection: 0,
    width: '100%',
    height: '30%',
    position: 'absolute',
    top: '55%',
    marginBottom: 0,
    alignItems: 'center',
  },
  readyContainer: {
    flex: 0,
    top: '20%',
    justifyContent: "center",
    alignItems: "center",
  },
  TitleText: {
    height: '50px',
    color: "white",
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
  },
  ReadyButton: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 125,
    margin: 30,
  },
  ReadyText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
  Container: {
    width: "80%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.DARK_PURPLE,
    borderRadius: theme.ROUNDING_SMALL,
    top: "10%",
    paddingBottom: 30,
  },
  Text: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
    top: "10%",
    position: "absolute",
  },
  timerText: {
    textAlign: "center",
    fontSize: theme.FONT_SIZE_SMALL,
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
  },
  Button: {
    width: "90%",
    height: "18%",
    justifyContent: "center",
    alignItems: "center",
    bottom: "5%",
    position: "absolute",
    borderRadius: theme.ROUNDING_SMALL,
    shadowOffset: theme.SHADOW_OFFSET,
    shadowOpacity: theme.SHADOW_OPACITY,
  },
  ButtonText: {
    color: "white",
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
  },
});

export default ArtQWaiting;
