import React from "react";
import {
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import QuestionButton from "./components/QuestionButton"
import Shop from "./components/Shop"
import styleSheets from "../styles/StyleSheets";
import theme from "../styles/themes";
import { LinearGradient } from "expo-linear-gradient";

export default class NewsQDone extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numCorrect: this.props.navigation.state.params.numCorrect, 
            completeGame: this.props.navigation.state.params.completeGame,
            timeLeft: this.props.navigation.state.params.timeLeft
        }
    }


    render() {
        console.log(this.state.completeGame)
        const game = this.state.completeGame.map((item, index) => (
        <>
            <View style={styles.rowContainer}>
                <Text style={styles.scoreText} key={index}>{index + 1}</Text>
                <LinearGradient style={styles.Gradient} colors={item.answerColor}>
                    <Text> </Text>
                </LinearGradient>
                <Text style={styles.scoreText} key={index}>{item.timeLeft}</Text>
            </View>
        </>))
        return(
        <SafeAreaView style={[styleSheets.MainContainer,]}>
            <QuestionButton />
            <View style={styles.textContainer}>
                <Text style={styles.greetUser}> Well done!</Text>
                <Text style={styles.greetUser}>{this.state.numCorrect +"/"+ this.state.completeGame.length}</Text>
            </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.headerText}>Question</Text>
                    <Text style={styles.headerText}>Answer</Text>
                    <Text style={styles.headerText}>Time</Text>
                </View>
                {game}
            <Shop/>
        </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    Gradient: {
        width: "10%",
        marginLeft: theme.MARGIN_LARGE,
        borderRadius: theme.ROUNDING_SMALL,
    },
    rowContainer: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-around",
        alingContent: "center",
        alignItems: "center",
        margin: theme.MARGIN_TINY
    },
    textContainer: {
        alignText: "center",
        alignItems: "center"
    },
    headerText : {
        fontSize: theme.FONT_SIZE_TINY,
        fontFamily: theme.DEFAULT_FONT,
        color: "#FFFFFF",
    },
    scoreText : {
        flexShrink: 1,
        fontSize: theme.FONT_SIZE_TINY,
        fontFamily: theme.DEFAULT_FONT,
        color: "#FFFFFF",
    },
    greetUser: {
        fontSize: theme.FONT_SIZE_EXTRA_SMALL,
        fontFamily: theme.DEFAULT_FONT,
        color: "#FFFFFF"
    }
});