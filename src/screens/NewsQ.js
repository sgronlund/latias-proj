import React from "react";
import {
  Button,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import theme from "../styles/themes";
import { LinearGradient } from "expo-linear-gradient";
import Toolbar from "./components/Toolbar";
import styleSheets from "../styles/StyleSheets";
import QuestionButton from "./components/QuestionButton";

const NewsQ = () => {
  return (
    <SafeAreaView style={styleSheets.MainContainer}>
      <Toolbar />
      <QuestionButton />
      <Text style={styles.numberQ}>6/10 </Text>
      <LinearGradient colors={theme.PINK_GRADIENT} style={styles.button_pink}>
        <Text style={styles.button_pink}>Vem ska trump gifta sig med?</Text>
      </LinearGradient>

      <LinearGradient colors={theme.BLUE_GRADIENT} style={styles.button_blue}>
        <TouchableOpacity>
          <Text style={styles.button_blue}>Aishe</Text>
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient colors={theme.BLUE_GRADIENT} style={styles.button_blue}>
        <TouchableOpacity>
          <Text style={styles.button_blue}>Kimiya</Text>
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient colors={theme.BLUE_GRADIENT} style={styles.button_blue}>
        <TouchableOpacity>
          <Text style={styles.button_blue}>Niclas</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.ansContainer}>
        <Text>hej</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button_pink: {
    fontSize: 23,
    color: "#FFFFFF",
    textAlign: "center",
    width: "95%",
    margin: theme.MARGIN_MEDIUM,
    padding: 27,
    borderRadius: theme.ROUNDING_SMALL,
  },
  button_blue: {
    fontSize: 22,
    color: "#FFFFFF",
    textAlign: "center",
    width: "95%",
    margin: theme.MARGIN_SMALL,
    padding: 12,
    borderRadius: theme.ROUNDING_SMALL,
  },
  numberQ: {
    color: "#FFFFFF",
    left: 150,
    marginTop: 30,
    marginBottom: -5,
    fontSize: 20,
  },
  ansContainer: {
    backgroundColor: theme.DARK_PURPLE,
    width: "90%",
    margin: theme.MARGIN_LARGE,
    padding: 50,
    borderRadius: theme.ROUNDING_SMALL,
  },
});

export default NewsQ;
