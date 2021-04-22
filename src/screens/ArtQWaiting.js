import React from "react";
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import theme from "../styles/themes";
import { LinearGradient } from "expo-linear-gradient";
import styleSheets from "../styles/StyleSheets";
import QuestionButton from "./components/QuestionButton";
import { Socket } from "../misc/Socket";
import Shop from "./components/Shop"

class ArtQWaiting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {time: "", loggedIn: true};
  }

  componentDidMount() {
    this.initSockets();
  }

  componentWillUnmount() {
    Socket.off("timeLeft");
  }

  initSockets() {
    Socket.on("timeLeft", (timeLeft) => {
      this.setState({ time: timeLeft });
    });
    Socket.on("returnUserSuccess", () => {
      Socket.off("returnUserSuccess");
      this.setState({ loggedIn: true });
    });
    Socket.emit("getUser", Socket.id);
  }

  render() {
    const isLoggedIn = this.state.loggedIn;
   return(
     <SafeAreaView style={styleSheets.MainContainer}>
       <QuestionButton/>
       {/*<Scoreboard/>*/}
       {isLoggedIn ? <Shop /> : null}
       <View style={styles.Container}>
        <Text style={styles.Text}>THIS QUIZ IS AVAILABLE IN</Text>
        <Text style={styles.timerText}>{this.state.time}</Text>
        <LinearGradient 
          colors={theme.PINK_GRADIENT}
          style={styles.Button}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Read")}>
            <Text style={styles.ButtonText}>READ THIS WEEKS ARTICLES</Text>
          </TouchableOpacity>
        </LinearGradient> 
       </View>
     </SafeAreaView>
   )
  }
}

const styles = StyleSheet.create({
  Container: {
    width: "80%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.DARK_PURPLE,
    borderRadius: theme.ROUNDING_SMALL,
    marginTop: "20%",
    paddingBottom: 30
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
    fontSize: theme.FONT_SIZE_EXTRA_SMALL
  }
});

export default ArtQWaiting;
