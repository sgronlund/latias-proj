import React from "react";
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import theme from "../styles/themes";
import styleSheets from "../styles/StyleSheets";
import { Socket, initDeveloperArticlesSockets } from "../misc/Socket";
import currentWeekNumber from "current-week-number";

/**
 * @summary This screen is where the developer can submit
 * questions to the news quiz
 */
class DeveloperArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleName: "",
      link: "",
      weekNumber: "",
      weekNumberReset: ""
    };
  }

  /**
   * @function
   * @summary Updates the state of the articleName when the user inputs text
   * @param {String} text text to update articleName to
   */
  handleArticleName = (text) => {
    this.setState({ articleName: text });
  };

  /**
   * @function
   * @summary Updates the state of link when the user inputs text
   * @param {String} text text to update link to
   */
  handleLink = (text) => {
    this.setState({ link: text });
  };

  /**
   * @function
   * @summary Updates the state of weekNumber when the user
   * inputs text
   * @param {String} text text to weekNumber to
   */
  handleWeekNumber = (text) => {
    this.setState({ weekNumber: text });
  };

  /**
   * @function
   * @summary Updates the state of weekNumber when the user
   * inputs text
   * @param {String} text text to weekNumber to
   */
  handleWeekNumberReset = (text) => {
    this.setState({ weekNumberReset: text });
  };

  /**
   * @function
   * @summary Tells the server that a developer is submitting
   * an article
   */
  handleSubmitArticle = () => {
    const articleName = this.state.articleName;
    const link = this.state.link;
    const weekNumber = this.state.weekNumber;
    let linkRegex = new RegExp(
      /^(http|https):\/\/(www.)[a-öA-Ö0-9]+[a-öA-Ö0-9.]+?\.[a-öA-Ö0-9]+[a-öA-Ö0-9\-\/]+?$/
    );

    if (!articleName || !link) return alert("Du har lämnat blanka fält!");
    if (weekNumber) {
      weekNumber = parseInt(weekNumber);
      if (isNaN(weekNumber)) return alert("Du har ej angett ett tal");
      if (weekNumber > 52 || weekNumber < 1)
        return alert("Du har ej angett ett giltigt veckonummer!");
    } else {
      weekNumber = currentWeekNumber();
    }
    if (!linkRegex.test(link)) return alert("Felaktigt länkformat!");

    initDeveloperArticlesSockets();
    Socket.emit("addArticle", articleName, link, weekNumber);
  };

  /**
   * @function
   * @summary Tells the server to remove articles for the
   * current week
   */
  resetArticles = () => {
    const weekNumber = parseInt(this.state.weekNumberReset);
    if (weekNumber) Socket.emit("resetArticles", parseInt(weekNumber));
    else Socket.emit("resetArticles", currentWeekNumber());

    alert("Artiklarna har återställts!");
  };

  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <View style={styles.InputContainer}>
          <Text style={styleSheets.inputHeader}>Namn:</Text>
          <TextInput
            style={styleSheets.Input}
            placeholder="Artikelns namn"
            onChangeText={this.handleArticleName}
          />
          <Text style={styleSheets.inputHeader}>Länk:</Text>
          <TextInput
            style={styleSheets.Input}
            placeholder="Länk"
            onChangeText={this.handleLink}
          />
          <Text style={styleSheets.inputHeader}>Vecka:</Text>
          <TextInput
            style={styleSheets.Input}
            placeholder="Lämna blankt för denna vecka"
            onChangeText={this.handleWeekNumber}
          />
        </View>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.PinkBackground]}
          onPress={this.handleSubmitArticle}
        >
          <Text style={styleSheets.ButtonText}>SKICKA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styleSheets.GenericButton, styleSheets.PinkBackground]}
          onPress={this.resetArticles}
        >
          <Text style={styleSheets.ButtonText}>ÅTERSTÄLL ARTIKLAR</Text>
        </TouchableOpacity>
        <TextInput
          style={[styleSheets.Input]}
          placeholder="Lämna blankt för denna vecka"
          onChangeText={this.handleWeekNumberReset}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ResetContainer: {
    height: "20%",
    width: "100%",
  },
  InputContainer: {
    width: "95%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.DARK_PURPLE,
    borderRadius: theme.ROUNDING_SMALL,
    margin: theme.MARGIN_LARGE,
  },
});

export default DeveloperArticles;
