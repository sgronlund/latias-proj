import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import socketClient  from "socket.io-client";

export default function App() {


  //Connects to the running ExpressJS server
  var socket = socketClient ("http://127.0.0.1:8080");
  socket.on('connection', () => {
      console.log(`I'm connected with the back-end`);
  });
  
  /**
   * When the button is pressed we emit the message btnpress over our connected socket.
   * This emission must be handled in the server by using a socket.on('btnpress', ...),
   * which lets us define a behaviour for the server when it receives this message
   */
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Say hello to the backend" onPress ={ () => {socket.emit('btnpress')}}/>
      <StatusBar  style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
