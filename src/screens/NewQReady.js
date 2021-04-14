import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, } from "react-native"; 
import styleSheets from "../styles/StyleSheets.js";
import theme from "../styles/themes.js";
import QuestionButton from "./components/QuestionButton";
import Toolbar from "./components/Toolbar";


class NewQReady extends React.Component {
    render() {
        return (
            <SafeAreaView style={styleSheets.MainContainer}>
            <Toolbar />
            <QuestionButton />
            <TouchableOpacity style={styles.RoundButton}>
                <Text style={styleSheets.ButtonText}>Start</Text>
            </TouchableOpacity>

            </SafeAreaView>
        )
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

    RoundButton: {
        width: theme.ROUND_START_BUTTON,
        height: theme.ROUND_START_BUTTON,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.PINK,
        margin: theme.MARGIN_MEDIUM,
        padding: 10,
        borderRadius: theme.ROUND_START_BUTTON,
      },
  });
export default NewQReady;