import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { loadAsync } from "expo-font";

import { Image } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import Guest from "./screens/Guest";
import Signup from "./screens/Signup";
import LogIn from "./screens/LogIn";
import Settings from "./screens/Settings";
import Toolbar from "./screens/components/Toolbar";
import Reset from "./screens/Reset";
import NewsQ from "./screens/NewsQ";
import Read from "./screens/Read";
import VerifyReset from "./screens/VerifyReset";
import UpdatePassword from "./screens/updatePassword";
import Developer from "./screens/Developer";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import themes from "./styles/themes";

/**
 * @summary This file contains the stack navigator
 * for navigating between different screens.
 */
const navigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        header: false,
      }),
    },
    Read: {
      screen: Read,
      navigationOptions: ({ navigation }) => ({
        title: "READ THIS WEEKS ARTICLES",
      }),
    },
    NewsQ: {
      screen: NewsQ,
      navigationOptions: ({ navigation }) => ({
        title: "THIS WEEKS NEWS QUIZ",
        headerLeft: null,
      }),
    },
    Guest: {
      screen: Guest,
      navigationOptions: ({ navigation }) => ({
        title: "THE REAL DEAL",
        headerLeft: null,
      }),
    },
    Sign: {
      screen: Signup,
      navigationOptions: ({ navigation }) => ({
        title: "SIGN UP",
      }),
    },
    LogIn: {
      screen: LogIn,
      navigationOptions: ({ navigation }) => ({
        title: "LOG IN",
      }),
    },
    Settings: {
      screen: Settings,
      navigationOptions: ({ navigation }) => ({
        title: "SETTINGS",
      }),
    },
    Toolbar: Toolbar,
    Reset: Reset,
    VerifyReset: VerifyReset,
    UpdatePassword: UpdatePassword,
    Developer: Developer,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerTintColor: "#FFFFFF",
      headerStyle: {
        backgroundColor: themes.PURPLE_LIGHT,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        alignSelf: "center",
        fontSize: 30,
        fontFamily: themes.DEFAULT_FONT,
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image source={require("./assets/favicon.png")} />
        </TouchableOpacity>
      ),
    },
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await loadAsync({
      Ramaraja: require("./assets/fonts/Ramaraja.ttf"),
      "Roboto Slab": require("./assets/fonts/RobotoSlab-Regular.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const Container = createAppContainer(navigator);
    return <Container />;
  }
}
