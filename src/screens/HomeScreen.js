import React from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity, Image } from "react-native";
import themes from "../styles/themes";
import theme from '../styles/themes'

const HomeScreen = ({ navigation }) => {
    return (
        <View style = {styles.MainContainer}>
            <View style = {styles.TitleContainer}>
                <Text style = {styles.TitleText}>HORT</Text>
                <Text style = {styles.PurpleLine}>─────────</Text>
            </View>
            <TouchableOpacity style = {styles.LoginButton} onPress={() => navigation.navigate('LogIn')}>
                <Text style = {styles.ButtonText}>LOG IN</Text>
            </TouchableOpacity>
            <Text style = {styles.Text}>─────   or   ─────</Text>
            <TouchableOpacity style = {styles.GenericButton} onPress={() => navigation.navigate('Sign')}>
                <Text style = {styles.ButtonText}>SIGN UP</Text></TouchableOpacity>
            <TouchableOpacity style = {styles.GenericButton} onPress={() => navigation.navigate('Cont')}>
                <Text style = {styles.ButtonText}>PLAY AS GUEST</Text>
            </TouchableOpacity>
        </View>
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
    ButtonText:
    {
        fontSize: theme.FONT_SIZE_MEDIUM,
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
        fontSize: '40px'
    },
    LoginButton:
    {
        width: '80%',
        height: '8%',
        alignItems: "center",
        backgroundColor: theme.PINK,
        padding: theme.PADDING_SMALL,
        borderRadius: theme.ROUNDING_LARGE,
        margin: theme.MARGIN_MEDIUM,
        shadowOffset: theme.SHADOW_OFFSET,
        shadowOpacity: theme.SHADOW_OPACITY
    },
    GenericButton:
    {
        width: '80%',
        height: '8%',
        alignItems: "center",
        backgroundColor: theme.LIGHT_BLUE,
        padding: theme.PADDING_SMALL,
        borderRadius: theme.ROUNDING_LARGE,
        margin: theme.MARGIN_MEDIUM,
        shadowOffset: theme.SHADOW_OFFSET,
        shadowOpacity: theme.SHADOW_OPACITY
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