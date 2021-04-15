import React from "react";
import { Text, Dimensions, TouchableOpacity, View } from "react-native"; 
import theme from "../../styles/themes.js";
import styleSheets from "../../styles/StyleSheets";
//import { Colors } from "react-native/Libraries/NewAppScreen";

class CircleButton extends React.Component {
    state = {
        dimensions: {
          window,
          screen
        }
      };
    
      onChange = ({ window, screen }) => {
        this.setState({ dimensions: { window, screen } });
      };
    
      componentDidMount() {
        Dimensions.addEventListener("change", this.onChange);
      }
    
      componentWillUnmount() {
        Dimensions.removeEventListener("change", this.onChange);
      }
  
    render() {
        return (
            <View>
            <TouchableOpacity
              style = {{
                borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                width: Dimensions.get('window').width * 0.5,
                height: Dimensions.get('window').width * 0.5,
                backgroundColor: theme.PINK,
                justifyContent: 'center',
                alignItems: 'center',
                margin: theme.MARGIN_MEDIUM,
                border: "2px",
                borderColor: "black",
                borderStyle:'solid',
              }}
              underlayColor = '#ccc'
              onPress = { () => alert('Yaay!') }
            >
            <Text 
            style={ {
            fontSize: Dimensions.get('window').width / 10, 
            color: "white"
            }}>
              START
            </Text>
            </TouchableOpacity>
            </View>
        )
    }
}


export default CircleButton;