import React from "react";
import { Text, View, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
    return (
        <View>
    <Button 
    title="LOG IN"
    onPress={() => navigation.navigate('LogIn')}
    />
    <Text>or</Text>
    <Button 
    title="SIGN UP"
    onPress={() => navigation.navigate('Sign')}
    />
    <Button 
    title="PLAY AS GUEST"
    onPress={() => navigation.navigate('Cont')}
    />
     </View>
    );
}; 

export default HomeScreen;