import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../styles/themes";
import styleSheets from "../styles/StyleSheets";

/**
 * @summary This represents the login screen. From here you
 * can either login or press reset password which will lead
 * you to the reset page.
 */
class Developer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("DeveloperNewsQ")}
            style={styles.Button}
          >
            {<LinearGradient
              colors={theme.BLUE_GRADIENT}
              style={styles.Gradient}
            >
              <Text style={styles.ButtonText}>NEWS QUIZ</Text>
            </LinearGradient>}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("DeveloperArtQ")}
            style={styles.Button}
          >
            {<LinearGradient
              colors={theme.PINK_GRADIENT}
              style={styles.Gradient}
            >
              <Text style={styles.ButtonText}>ART QUIZ</Text>
            </LinearGradient>}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("DeveloperQuestions")}
            style={styles.Button}
          >
            {<LinearGradient
              colors={theme.DARK_BLUE_GRADIENT}
              style={styles.Gradient}
            >
              <Text style={styles.ButtonText}>QUESTIONS</Text>
            </LinearGradient>}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ButtonContainer: {
    height: "70%",
    width: "95%",
    alignItems: "center",
    margin: theme.MARGIN_SMALL,
  },
  Button: {
    width: "100%",
    height: "30%",
    marginTop: theme.MARGIN_SMALL,
  },
  Gradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.ROUNDING_SMALL,
  },
  ButtonText: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: "#FFFFFF",
  },
});

export default Developer;
