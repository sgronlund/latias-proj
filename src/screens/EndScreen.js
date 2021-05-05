import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, Button } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { withNavigation } from 'react-navigation';
import CircleButton from './components/circlebutton';
import styleSheets from "../styles/StyleSheets";
import theme from "../styles/themes";
import TitleContainer from "./components/TitleContainer"


class EndScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styleSheets.MainContainer}>
                <TitleContainer/>

              <Text style={styles.header}>YOUR ANSWERS IS SUBMITTED</Text>


            <CircleButton>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("GameScreen")}>
            <Text style={styles.ButtonText}>
                HOMESCREEN
            </Text>
            </TouchableOpacity>
            </CircleButton>

        </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    header: {
      fontSize: theme.FONT_SIZE_EXTRA_SMALL,
      color: "#FFFFFF",
      fontFamily: theme.DEFAULT_FONT,
      justifyContent: "center",
    },
    ButtonText : {
        fontSize: Dimensions.get('window').width / 14,
        fontFamily: theme.DEFAULT_FONT,
        color: 'white',
    }
  });

export default withNavigation(EndScreen);