import React from "react";
import { Text, View, StyleSheet } from "react-native";
import theme from '../../styles/themes.js'

class TitleContainer extends React.Component {
    render() {
        return (
            <View style = {styles.TitleContainer}>
                <Text style = {styles.TitleText}>REAL DEAL</Text>
                <Text style = {styles.PurpleLine}>─────────</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
    TitleContainer:
    {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#545985',
        width: '95%',
        height: '30%',
        borderRadius: theme.ROUNDING_SMALL,
        margin: theme.MARGIN_LARGE
    },
    TitleText:
    {
        fontSize: theme.FONT_SIZE_LARGE,
        color: 'white',
        fontFamily: theme.DEFAULT_FONT,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 5,
    },
    PurpleLine:
    {
        color: theme.PINK,
        fontSize: 40
    }
    });
  
export default TitleContainer;