import React from "react";
import { Text, StyleSheet, TouchableOpacity, SafeAreaView, View } from "react-native";
import theme from "../../styles/themes.js";

const Gameplay = "Do this\nDo that\nAnd that\nAnd that"

/**
 * @summary This is a component which leads the user to
 * the screen where information about the application
 * is displayed.
 */
class QuestionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  toggleShow = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    if(this.state.show) {
      return(
        <View style = {styles.Main}>
          <View style={styles.Overlay}>
            <Text style={styles.TextBig}>How to play:</Text>
            <Text style={styles.TextSmall}>{Gameplay}</Text>
          </View>
          <View style={styles.Container}>
            <TouchableOpacity style={styles.Circle} onPress={() => this.toggleShow()}>
              <Text style={styles.QuestionMark}>?</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return(
        <View style={styles.Container}>
          <TouchableOpacity style={styles.Circle} onPress={() => this.toggleShow()}>
            <Text style={styles.QuestionMark}>?</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  Main: {
    zIndex: 999,
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  Container: {
    position: "absolute",
    alignSelf: "flex-end",
    margin: theme.MARGIN_MEDIUM,
    bottom: 0,
  },
  Circle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "black",
    opacity: 0.9,
    textAlign: "center",
    justifyContent: "center"
  },
  QuestionMark: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: "white"
  },
  TextBig: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: "white"
  },
  TextSmall: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: "white"
  },
  Overlay: {
    padding: theme.PADDING_MEDIUM,
    position: 'absolute',
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.9
  }
});

export default QuestionButton;