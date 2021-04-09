import React from "react";
import { Text, View, StyleSheet } from "react-native";
import theme from '../../styles/themes.js'

class TitleContainer extends React.Component {
    render() {
        return (
            <View style = {styles.TitleContainer}>
                <Text style = {styles.TitleText}>HORT</Text>
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
        height: '35%',
        borderRadius: theme.ROUNDING_SMALL,
        margin: theme.MARGIN_MEDIUM
    },
    TitleText:
    {
        fontSize: theme.FONT_SIZE_LARGE,
        color: 'white',
        fontFamily: theme.DEFAULT_FONT
    },
    PurpleLine:
    {
        color: theme.PINK,
        fontSize: 40
    }
    });
  
export default TitleContainer;