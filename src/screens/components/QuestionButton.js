import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView,
} from "react-native";
import theme from "../../styles/themes.js";

const RealDeal = `Quiza på dina nyhetskunskaper! Det finns två olika quiz, dels artiklequizet där du läser några artiklar under veckan och quizar på dem på söndag kväll, sedan även nyhetsfrågor där du får snabba frågor om händelser under veckan. Läs tidningen och quiza loss!\n` 

const ArticleQuiz = `Artikelquizet består av to frågor, som hänvisar till någon av de tre artiklar som finns tillgängliga under veckan. Frågorna kommer vara lite svårare men belönas desto mer! Quizet finns tillgängligt på söndagar mellan 18 och 20.\n`

const NewsQuiz = `Nyhetsfrågor är 12 korta frågor om händelser från veckan. Här gäller det att svara snabbt eftersom detta ger mer poäng. Quizet finns tillgängligt hela veckan och byts ut på måndagar.\n`

const Result = `Varje rätt svar i ArtikelQuizet ger användaren 50 poäng. Om användaren svarar alla rätt så belönar vi användaren med 75 poäng per fråga istället för 50 poäng.\n\nVarje rätt i Nyhetsfrågorna ger användaren 5 poäng + 0 till 5 poäng beroende på hur snabbt användaren svarar. Om användaren svarar alla rätt så får den 30 extra poäng. Detta gör att användaren kan få maximalt 150 poäng.`

const Balance = `För att räkna ut hur mycket saldo användaren ska få så tar vi poängen från quizzen och delar med 10.`


/**
 * @summary This is a component which leads the user to
 * the screen where information about the application
 * is displayed.
 */
class QuestionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  toggleShow() {
    this.setState({ show: !this.state.show });
    return this.state.show;
  }

  render() {
    if (this.state.show) {
      return (
        <View style={styles.Main}>
          <ScrollView style={styles.Overlay}>
            <Text style={styles.TextBig}>The Real Deal:</Text>
            <Text style={styles.TextSmall}>{RealDeal}</Text>
            <Text style={styles.TextBig}>Artikel Quiz:</Text>
            <Text style={styles.TextSmall}>{ArticleQuiz}</Text>
            <Text style={styles.TextBig}>Nyhetsfrågor:</Text>
            <Text style={styles.TextSmall}>{NewsQuiz}</Text>
            <Text style={styles.TextBig}>Poäng:</Text>
            <Text style={styles.TextSmall}>{Result}</Text>
            <Text style={styles.TextBig}>Saldo:</Text>
            <Text style={styles.TextSmall}>{Balance}</Text>
          </ScrollView>
          <View style={styles.Container}>
            <TouchableOpacity
              style={styles.Circle}
              onPress={() => this.toggleShow()}
            >
              <Text style={styles.QuestionMark}>?</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.Container}>
          <TouchableOpacity
            style={styles.Circle}
            onPress={() => this.toggleShow()}
          >
            <Text style={styles.QuestionMark}>?</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const width = Dimensions.get("window").width;

global.responsive = {
  width: width / 8,
  height: width / 8,
  borderRadius: width / 16,
};

const styles = StyleSheet.create({
  Main: {
    zIndex: 998,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  Container: {
    position: "absolute",
    alignSelf: "flex-end",
    margin: theme.MARGIN_SMALL,
    padding: theme.PADDING_SMALL,
    bottom: 0,
    right: 0,
  },
  Circle: {
    width: responsive.width,
    height: responsive.height,
    borderRadius: responsive.borderRadius,
    backgroundColor: "black",
    opacity: 0.9,
    textAlign: "center",
    justifyContent: "center",
  },
  QuestionMark: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    textAlign: "center",
    color: "white",
  },
  TextBig: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: "white",
    marginBottom: theme.MARGIN_SMALL
  },
  TextSmall: {
    fontSize: theme.FONT_SIZE_SMALL,
    color: "white",
    flexWrap: "wrap",
    marginBottom: theme.MARGIN_EXTRA_TINY
  },
  Overlay: {
    padding: theme.PADDING_MEDIUM,
    flexGrow: 1,
    backgroundColor: "black",
    opacity: 0.9,
  },
});

export default QuestionButton;
