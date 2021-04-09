import React from 'react';
import { Button, View, Text } from "react-native";

const ContGuest = () => {
    return <View>
        <Text>WHAT DO YOU WANT TO DO</Text>
        <Button 
        title="THIS WEEKS ARTICLE QUIZ"
        />
        <Button 
        title="THIS WEEKS NEWS QUIZ"
        />
        <Button 
        title="READ THIS WEEKS ARTICLE"
        />
        <Button 
        title="SCOREBOARD"
        />
    </View>
};

export default ContGuest;