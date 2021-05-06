import React from "react";
import { Text, Dimensions, TouchableOpacity, View } from "react-native"; 
import theme from "../../styles/themes.js";
import styleSheets from "../../styles/StyleSheets";

class CircleButton extends React.Component {
    constructor(props) {
        super(props);
      }
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
            
            <TouchableOpacity
              style = {{
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
              }}
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


export default CircleButton;
