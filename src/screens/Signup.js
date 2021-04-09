import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Button, Text } from "react-native";
import socketClient from "socket.io-client";

//Fattar inte hur detta fungerar
//Hittade på react native docs

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }

  handleUsername = (text) => {
    this.setState({ username: text});
  }

  handlePassword = (text) => {
    this.setState({ password: text});
  }

  handleRegister = (username, password) => {
    var socket = this.connect();
    socket.emit('register', username, password);
  }

  handleLogin = (username, password) => {
    var socket = this.connect();
    socket.emit('login', username, password);
  }

  connect() {
    var socket = socketClient ("http://localhost:8080");
    this.initSockets(socket);
    return socket;
  }

  initSockets(socket) {
    socket.on('registerSuccess', () => {alert("Register successful!")});
    socket.on('registerFailure', () => {alert("Username busy!")});
    socket.on('loginSuccess', () => {
      alert("Login successful!")
      this.isLoggedIn = true;
    });
    socket.on('loginFailure', () => {alert("Login failed!")});
  }

  render() {
    return (
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={this.handleUsername}
          placeholder="your username"
          //value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={this.handlePassword}
          //value={number}
          placeholder="your password"
          keyboardType="numeric"
        />
        <Button title="Register" onPress= {() => this.handleRegister(this.state.username, this.state.password)}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default Signup;