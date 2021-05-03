import React from "react";
import { Text, StyleSheet, TouchableOpacity, Dimensions, View } from "react-native";
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

  toggleShow() {
    this.setState({ show: !this.state.show })
    return this.state.show;
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

const width = Dimensions.get('window').width;

global.responsive = {
  width: width/8,
  height: width/8,
  borderRadius: width/16
}

const styles = StyleSheet.create({
  Main: {
    zIndex: 998,
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  Container: {
    position: "absolute",
    alignSelf: "flex-end",
    margin: theme.MARGIN_SMALL,
    padding: theme.PADDING_SMALL,
    bottom: 0,
  },
  Circle: {
    width: responsive.width,
    height: responsive.height,
    borderRadius: responsive.borderRadius,
    backgroundColor: "black",
    opacity: 0.9,
    textAlign: "center",
    justifyContent: "center"
  },
  QuestionMark: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    textAlign: "center",
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
    flexGrow: 1,
    backgroundColor: "black",
    opacity: 0.9
  }
});

export default QuestionButton;
