import React from "react";
import { TextInput, SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import socketClient from "socket.io-client";
import QuestionButton from './components/QuestionButton'
import theme from '../styles/themes'
import styleSheets from '../styles/StyleSheets'
import Toolbar from './components/Toolbar'

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
              </View>
              <TouchableOpacity style = {styleSheets.PinkButton} onPress= {() => this.handleLogin(this.state.username, this.state.password)}>
                <Text style = {styleSheets.ButtonText}>LOG IN</Text>
              </TouchableOpacity>
              <TouchableOpacity><Text style = {styles.ForgotPassword}>forgot password?</Text></TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    LoginContainer: 
    {   
        width: '95%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.DARK_PURPLE,
        borderRadius: theme.ROUNDING_SMALL,
        margin: theme.MARGIN_LARGE
    },
    ForgotPassword:
    {
      fontFamily: 'Roboto Slab',
      fontSize: theme.FONT_SIZE_EXTRA_SMALL,
      color: '#3E9EFE',
      textDecorationLine: 'underline'
    }
});

export default LogIn;