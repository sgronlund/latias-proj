import React from "react";
import { TextInput, SafeAreaView, View, StyleSheet, Button } from "react-native";
import socketClient from "socket.io-client";



class LogIn extends React.Component {
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
        socket.on('loginSuccess', () => {
          alert("Login successful!")
        });
        socket.on('loginFailure', () => {alert("Login failed!")});
        }

    render () {
        return (
            <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="your username"
          onChangeText={this.handleUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="your password"
          onChangeText={this.handlePassword}
        />
        <Button 
        title="Login" 
        onPress= {() => this.handleLogin(this.state.username, this.state.password)}/>
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

export default LogIn;
