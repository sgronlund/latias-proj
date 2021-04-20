import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import theme from "../styles/themes";
import TitleContainer from "./components/TitleContainer";
import QuestionButton from "./components/QuestionButton";
import styleSheets from "../styles/StyleSheets";
import { withNavigation } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";

const ShopScreen = () => {
  return <SafeAreaView style={styleSheets.MainContainer}></SafeAreaView>;
};

export default ShopScreen;
