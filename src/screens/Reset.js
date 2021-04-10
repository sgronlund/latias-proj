import React from "react";
import { TextInput, SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import QuestionButton from './components/QuestionButton'
import theme from '../styles/themes'
import styleSheets from '../styles/StyleSheets'
import Toolbar from './components/Toolbar'
import Socket from './Socket'

class Reset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: ''};
  }
    
  handleEmail = (text) => {
    this.setState({ email: text});
  }

  initSocket() {
    Socket.on('emailSuccess', () => {this.props.navigation.navigate('SubmitReset', {email: this.state.email})});
    Socket.on('emailFailure', () => {alert("Invalid email!")});
  }

  handleSubmit = (email) => {
    this.initSocket()
    Socket.emit('resetPass', email);
  }
      
  render () {
    return (
      <SafeAreaView style = {styleSheets.MainContainer}>
        <QuestionButton/>
          <Toolbar/>
          <View style = {styles.LoginContainer}>
                <Text style = {styles.CodeText}>Email:</Text>
                <TextInput
                  style={styleSheets.Input}
                  placeholder="Email"
                  onChangeText={this.handleEmail}
                />
              </View>
              <TouchableOpacity style = {styleSheets.PinkButton} onPress= {() => {this.handleSubmit(this.state.email)}}>
                <Text style = {styleSheets.ButtonText}>SEND MAIL</Text>
              </TouchableOpacity>
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
    },
    CodeText:
    {
      fontSize: theme.FONT_SIZE_LARGE,
      color: 'white',
      fontFamily: theme.DEFAULT_FONT
    }
});

export default Reset;