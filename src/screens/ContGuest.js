import React from 'react';
import { Button, SafeAreaView } from "react-native";
import Toolbar from './components/Toolbar'
import styleSheets from '../styles/StyleSheets'

const ContGuest = () => {
    return <SafeAreaView style = {styleSheets.MainContainer}>
        <Toolbar/>
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
    </SafeAreaView>
};

export default ContGuest;