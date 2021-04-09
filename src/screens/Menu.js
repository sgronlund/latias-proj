import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import {styleSheets} from "../styles/StyleSheets";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView } from 'react-native';
import socketClient, { io }  from "socket.io-client";
//kolla upp props
function Menu(props){
    return (
        <View style = {styleSheets.background}>
           <View style = {styleSheets.boarder}>
        </View>
        </View>
       
        );
}

export default Menu;