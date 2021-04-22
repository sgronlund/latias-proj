import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView
} from "react-native";
import theme from "../styles/themes";
import styleSheets from "../styles/StyleSheets";

/**
 * @summary This represents the login screen. From here you
 * can either login or press reset password which will lead
 * you to the reset page.
 */
class UserPolicy extends React.Component {
  render() {
    return (
      <SafeAreaView style={styleSheets.MainContainer}>
        <ScrollView contentContainerStyle={styles.Container}>
          <Text style={styles.Text}>
            {/*FIXME: Add actual relevant content*/}
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, "
          </Text>
          <Text style={styles.Text}>
            {"\n"}
            {/*FIXME: Add actual relevant content*/}
            quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </Text>
        </ScrollView>
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    margin: theme.MARGIN_MEDIUM,
    padding: theme.PADDING_LARGE,
    alignItems: "center",
    backgroundColor: theme.DARK_PURPLE,
    flexGrow: 1,
  },
  Text: {
    fontFamily: "Roboto Slab",
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: "white"
  },
});

export default UserPolicy;
