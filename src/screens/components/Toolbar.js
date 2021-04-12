import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import styleSheets from "../../styles/StyleSheets";
import { withNavigation } from "react-navigation";

/**
 * @summary This is a component that contains the toolbar
 * for the application. The user may return to a previous
 * page from this component.
 */
class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.Toolbar}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Text style={styleSheets.ButtonText}>↶</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Toolbar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#545985",
    width: "100%",
    height: "10%",
  },
});

export default withNavigation(Toolbar);
