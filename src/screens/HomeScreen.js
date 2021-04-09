import React from "react";
import { Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import theme from '../styles/themes'
import TitleContainer from './components/TitleContainer.js'
import QuestionButton from './components/QuestionButton.js'
import styleSheets from '../styles/StyleSheets.js'

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style = {styleSheets.MainContainer}>
            <TitleContainer/>
            <QuestionButton/>
            <TouchableOpacity style = {styleSheets.PinkButton} onPress={() => navigation.navigate('LogIn')}>
                <Text style = {styleSheets.ButtonText}>LOG IN</Text>
            </TouchableOpacity>
            <Text style = {styles.Text}>─────   or   ─────</Text>
            <TouchableOpacity style = {styleSheets.BlueButton} onPress={() => navigation.navigate('Sign')}>
                <Text style = {styleSheets.ButtonText}>SIGN UP</Text></TouchableOpacity>
            <TouchableOpacity style = {styleSheets.BlueButton} onPress={() => navigation.navigate('Cont')}>
                <Text style = {styleSheets.ButtonText}>PLAY AS GUEST</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}; 

const styles = StyleSheet.create(
    {
    MainContainer: 
    {   
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.PURPLE,
    },
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
    Text:
    {
        fontSize: theme.FONT_SIZE_SMALL,
        color: 'white',
        fontFamily: theme.DEFAULT_FONT
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
    },
    Image:
    {
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
        alignSelf: "flex-end"
    }
    });
  
export default HomeScreen;