import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import theme from "../styles/themes";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import styleSheets from "../styles/StyleSheets";
import QuestionButton from "./components/QuestionButton";
import { Socket } from "../misc/Socket";
import currentWeekNumber from "current-week-number"

class Read extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {articles : []}
  }

  componentDidMount() {
    Socket.on("getArticleSuccess", (articles) => {
      this.setState({articles: articles});
      Socket.off("getArticleFail");
      Socket.off("getArticleSuccess");
    });
    Socket.on("getArticleFail", () => {
      this.setState({articles: [{name: "Something went wrong", link: "", week: 10}]});
      Socket.off("getArticleFail");
      Socket.off("getArticleSuccess");
    });
    Socket.emit("getArticle", currentWeekNumber());
  }

  render() {
    console.log(this.state.articles);
    const articles = this.state.articles.map((item,index) => (
      <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                item.link
              )
            }
            style={styles.Button}
          >
            <LinearGradient colors={theme.PINK_GRADIENT} style={styles.Gradient}>
              <FontAwesome5
                name="book-open"
                size={theme.FONT_SIZE_EXTRA_SMALL}
                color="white"
              >
                {" "}
                {item.name}
              </FontAwesome5>
            </LinearGradient>
          </TouchableOpacity>
    ));

    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <QuestionButton />
        <View style={styles.midSquare}>
          <Text style={styles.header}>───── THIS WEEKS ARTICLES ─────</Text>
          {articles}
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  midSquare: {
    backgroundColor: theme.DARK_PURPLE,
    margin: theme.MARGIN_MEDIUM,
    borderRadius: theme.ROUNDING_SMALL,
    height: "60%",
    width: "90%",
    textAlign: "center",
  },
  Button: {
    flexGrow: 1,
    margin: theme.MARGIN_MEDIUM,
  },
  Gradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.ROUNDING_SMALL,
  },
  header: {
    justifyContent: "center",
    alignSelf: "center",
    color: theme.LIGHT_BLUE,
    margin: theme.MARGIN_MEDIUM,
    fontSize: theme.FONT_SIZE_TINY,
  },
});

export default Read;