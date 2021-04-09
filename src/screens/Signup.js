import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, View, TouchableOpacity } from "react-native";
import socketClient from "socket.io-client";
import QuestionButton from './components/QuestionButton'
import theme from '../styles/themes'
import TitleContainer from './components/TitleContainer'
import styleSheets from '../styles/StyleSheets'
import Toolbar from './components/Toolbar'

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', email: ''};
  }

  handleUsername = (text) => {
    this.setState({ username: text});
  }

  handlePassword = (text) => {
    this.setState({ password: text});
  }

  handleEmail = (text) => {
    this.setState({ email: text});
  }

  handleRegister = (username, password, email) => {
    var socket = this.connect();
    socket.emit('register', username, password, email);
  }

  connect() {
    var socket = socketClient ("http://localhost:8080");
    this.initSockets(socket);
    return socket;
  }

  initSockets(socket) {
    socket.on('registerSuccess', () => {alert("Register successful!")});
    socket.on('registerFailure', () => {alert("Username or email busy!")});
    socket.on('loginSuccess', () => {
      alert("Login successful!")
      this.isLoggedIn = true;
    });
    socket.on('loginFailure', () => {alert("Login failed!")});
  }

  render() {
    return (
      <SafeAreaView style = {styleSheets.MainContainer}>
              <QuestionButton/>
              <Toolbar/>
              <View style = {styles.LoginContainer}>
                <Text style = {styleSheets.LoginText}>Username:</Text>
                <TextInput
                  style={styleSheets.Input}
                  placeholder="your username"
                  onChangeText={this.handleUsername}
                />
                <Text style = {styleSheets.LoginText}>Password:</Text>
                <TextInput
                  style={styleSheets.Input}
                  placeholder="your password"
                  onChangeText={this.handlePassword}
                />
                <Text style = {styleSheets.LoginText}>Email:</Text>
                <TextInput
                  style={styleSheets.Input}
                  placeholder="your email"
                  onChangeText={this.handleEmail}
                />
              </View>
              <TouchableOpacity style = {styleSheets.BlueButton} onPress= {() => this.handleRegister(this.state.username, this.state.password, this.state.email)}>
                <Text style = {styleSheets.ButtonText}>REGISTER</Text>
              </TouchableOpacity>
            </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  LoginContainer: 
    {   
        width: '95%',
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.DARK_PURPLE,
        borderRadius: theme.ROUNDING_SMALL,
        margin: theme.MARGIN_LARGE
    },
});

export default Signup;