import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import socketClient, { io }  from "socket.io-client";

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  /**
   * When the button is pressed we emit the message btnpress over our connected socket.
   * This emission must be handled in the server by using a socket.on('btnpress', ...),
   * which lets us define a behaviour for the server when it receives this message
   */
  return (
    <View style={styles.container}>
      <TextInput
        style={{height: 40}}
        placeholder="Username"
        onChangeText={username => setUsername(username)} //Can do this in Register/Login function
      />
      <TextInput
        style={{height: 40}}
        placeholder="Password"
        onChangeText={password => setPassword(password)}
      />
      <Button title="Register" onPress = {() => {Register(username, password)}}/>
      <Button title="Login" onPress = {() => {Login(username, password)}}/>
      <StatusBar style="auto" />
    </View>
  );
}

// Function that initializes sockets
function initSockets(socket) {
  socket.on('connection', () => {console.log(`I'm connected with the back-end`);});
  socket.on('success', () => {console.log("logged in")/*TODO*/});
  socket.on('failure', () => {console.log("fail")/*TODO*/});
}

// Registers the user in the database
function Register(username, password) {
  var socket = Connect();
  socket.emit('register', username, password);
}

// Logs in the user
function Login(username, password) {
  var socket = Connect();
  socket.emit('login', username, password);
}

// Connects the user to the server
function Connect() {
  var socket = socketClient ("http://192.168.1.150:8080");
  initSockets(socket);
  return socket;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
