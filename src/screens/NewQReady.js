import React from "react";
import { SafeAreaView, StyleSheet, Dimensions, Text } from "react-native"; 
import styleSheets from "../styles/StyleSheets.js";
import CircleButton from "./components/CircleButton.js";
import QuestionButton from "./components/QuestionButton";
import Toolbar from "./components/Toolbar";
import theme from "../styles/themes";

//TODO: make lines in text compnenent blue
class NewQReady extends React.Component {
   
    render() {
        return (
            <SafeAreaView style={styleSheets.MainContainer}>
            <Toolbar />
            <Text style={styleSheets.TitleText}> ARE YOU READY? </Text>
            <CircleButton />
            <Text style={styles.Text}> ───── or ───── </Text>
            <QuestionButton />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    Text: {
        fontSize: theme.FONT_SIZE_SMALL,
        color: 'white'
    }
  });
export default NewQReady;