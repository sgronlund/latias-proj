import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import theme from "../styles/themes";
import QuestionButton from "./components/QuestionButton";
import styleSheets from "../styles/StyleSheets";
import { LinearGradient } from "expo-linear-gradient";

const ShopScreen = () => {
  return (
    <SafeAreaView style={styleSheets.MainContainer}>
      <QuestionButton />
      <View style={styles.midsquare}>
        <Text style={styles.header}>───── PRICE SHOP ─────</Text>
        <LinearGradient colors={theme.BLUE_GRADIENT} style={styles.button_blue}>
          <View>
            <Text style={styles.button_blue_text}>
              Liten latte OKQ8
              <TouchableOpacity>
                <View style={styles.button_price}>
                  <LinearGradient
                    colors={theme.PINK_GRADIENT}
                    style={styles.button_price}
                  >
                    <Text style={styles.text_button}>100€</Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </Text>
          </View>
        </LinearGradient>

        <LinearGradient colors={theme.BLUE_GRADIENT} style={styles.button_blue}>
          <View>
            <Text style={styles.button_blue_text}>
              Liten latte OKQ8
              <TouchableOpacity>
                <View style={styles.button_price}>
                  <LinearGradient
                    colors={theme.PINK_GRADIENT}
                    style={styles.button_price}
                  >
                    <Text style={styles.text_button}>100€</Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </Text>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  midsquare: {
    backgroundColor: theme.DARK_PURPLE,
    width: 350,
    height: 550,
    alignItems: "center",
    marginTop: 70,
    borderRadius: theme.ROUNDING_SMALL,
  },
  header: {
    justifyContent: "flex-start", //y-led
    alignItems: "center",
    color: theme.LIGHT_BLUE,
    margin: 30,
  },
  button_blue: {
    fontSize: 19,
    color: "#FFFFFF",
    padding: 5,
    paddingBottom: 0,
    width: "80%",
    margin: theme.MARGIN_MEDIUM,
    textAlign: "left",
    borderRadius: theme.ROUNDING_SMALL,
    fontFamily: theme.DEFAULT_FONT,
    shadowOffset: theme.SHADOW_OFFSET,
    shadowOpacity: theme.SHADOW_OPACITY,
    flexDirection: "row",
    //justifyContent: "space-between",
  },
  button_blue_text: {
    fontSize: 19,
    color: "#FFFFFF",
    margin: theme.MARGIN_MEDIUM,
    fontFamily: theme.DEFAULT_FONT,
    shadowOffset: theme.SHADOW_OFFSET,
    shadowOpacity: theme.SHADOW_OPACITY,
  },
  button_price: {
    width: 60,
    height: 30,
    borderRadius: theme.ROUNDING_SMALL,
    shadowOffset: theme.SHADOW_OFFSET,
    shadowOpacity: theme.SHADOW_OPACITY,
    marginLeft: 90,
  },
  text_button: {
    color: "#FFFFFF",
    fontFamily: theme.DEFAULT_FONT,
    fontSize: 21,
    textAlign: "center",
  },
});

export default ShopScreen;
