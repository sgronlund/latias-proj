import React from "react";
import { View, Text, SafeAreaView } from "react-native"; 
import Toolbar from "./components/Toolbar";


class NewQReady extends React.Component {
    render() {
        return (
            <SafeAreaView>
            <Toolbar />
            <Text>
                test fungerar?
            </Text>
            </SafeAreaView>
        )
    }
}

export default NewQReady;