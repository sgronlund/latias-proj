import React from "react";
import {
  Button,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ViewBase,
  Linking,
} from "react-native";
import { startClock } from "react-native-reanimated";
import theme from "../styles/themes";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import Toolbar from "./components/Toolbar";
import styleSheets from "../styles/StyleSheets";
import QuestionButton from "./components/QuestionButton";

const Read = () => {
  return (
    <SafeAreaView style={styleSheets.MainContainer}>
      <Toolbar />
      <QuestionButton />
      <View style={styles.midsquare}>
        <Text style={styles.header}>THIS WEEKS ARTICELS</Text>
        <LinearGradient colors={theme.PINK_GRADIENT} style={styles.button_pink}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.aftonbladet.se/nyheter/a/WLR4lk/donald-trump-har-gift-sig"
              )
            }
          >
            <Text style={styles.button_pink}>
              <View style={styles.icon}>
                <FontAwesome5 name="book-open" size={24} color="white" />
              </View>
              TRUMP HAR GIFT SIG
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient colors={theme.PINK_GRADIENT} style={styles.button_pink}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.aftonbladet.se/nyheter/a/WLR4lk/donald-trump-har-gift-sig"
              )
            }
          >
            <Text style={styles.button_pink}>
              <View style={styles.icon}>
                <FontAwesome5 name="book-open" size={24} color="white" />
              </View>
              TRUMP HAR GIFT SIG
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient colors={theme.PINK_GRADIENT} style={styles.button_pink}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.aftonbladet.se/nyheter/a/WLR4lk/donald-trump-har-gift-sig"
              )
            }
          >
            <Text style={styles.button_pink}>
              <View style={styles.icon}>
                <FontAwesome5 name="book-open" size={24} color="white" />
              </View>
              TRUMP HAR GIFT SIG
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainCont: {
    flex: 1,
    justifyContent: "center", //y-led
    alignItems: "center",
    backgroundColor: theme.PURPLE,
  },
  midsquare: {
    backgroundColor: theme.DARK_PURPLE,
    width: 350,
    height: 550,
    // justifyContent: "center", //y-led
    alignItems: "center",
  },
  header: {
    justifyContent: "flex-start", //y-led
    alignItems: "center",
    color: theme.LIGHT_BLUE,
    margin: 30,
  },
  button_pink: {
    fontSize: 17,
    color: "#FFFFFF",
    padding: 7,
    width: "80%",
    margin: theme.MARGIN_MEDIUM,
    textAlign: "center",
    borderRadius: theme.ROUNDING_SMALL,
  },
  icon: {
    //funker ej
    justifyContent: "flex-end", //y-led
  },
});

export default Read;
