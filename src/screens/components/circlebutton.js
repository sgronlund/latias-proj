import React from "react";
import { Text, Dimensions, TouchableOpacity, StyleSheet } from "react-native"; 
import theme from "../../styles/themes.js";

class CircleButton extends React.Component {
    constructor(props) {
        super(props);
      }
    

    render() {
        return (
            
            <TouchableOpacity
              style = {styles.endScreenButton}
              underlayColor = '#ccc'
              onPress = { () => {this.props.children} }
            >
            <Text>
              {this.props.children}
            </Text>
            </TouchableOpacity>
            
        )
    }
}
const {width, height} = Dimensions.get('window');

global.responsive = {
  width: width / 7,
  height: width / 7,
  borderRadius: width + height / 2
}

const styles = StyleSheet.create({
  endScreenButton: {
  borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
  width: Dimensions.get('window').width * 0.7,
  height: Dimensions.get('window').width * 0.7,
  backgroundColor: theme.PINK,
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.MARGIN_MEDIUM,
  border: "2px",
  borderColor: "black",
  borderStyle:'solid',
}});

export default CircleButton;
