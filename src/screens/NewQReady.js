import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native"; 
import styleSheets from "../styles/StyleSheets";
import Toolbar from "./components/Toolbar";


class NewQReady extends React.Component {
    render() {
        return (
            <SafeAreaView style={styleSheets.MainContainer}>
            <Toolbar />

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

})

export default NewQReady;