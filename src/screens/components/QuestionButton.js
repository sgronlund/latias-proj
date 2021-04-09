import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from '../../styles/themes.js'

class QuestionButton extends React.Component {
    render() {
        return (
            <TouchableOpacity style = {styles.circle}> 
                <Text style = {styles.Text}>?</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create(
    {
    circle: {
        width: 44,
        height: 44,
        borderRadius: 44/2,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.MARGIN_MEDIUM,
        bottom: 0
    },
    Text: {
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: 'white',
        fontFamily: 'Roboto Slab'
    }
    });
  
export default QuestionButton;