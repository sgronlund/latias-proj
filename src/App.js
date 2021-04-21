import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { loadAsync } from "expo-font";

import { Image } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import Signup from "./screens/Signup";
import LogIn from "./screens/LogIn";
import Settings from "./screens/Settings";
import Toolbar from "./screens/components/Toolbar";
import Reset from "./screens/Reset";
import NewsQ from "./screens/NewsQ";
import Read from "./screens/Read";
import ShopScreen from "./screens/ShopScreen";
import VerifyReset from "./screens/VerifyReset";
import UpdatePassword from "./screens/updatePassword";
import Developer from "./screens/Developer";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import themes from "./styles/themes";
import { Ionicons } from '@expo/vector-icons'; 

/**
 * @summary This file contains the stack navigator
 * for navigating between different screens.
 */
const navigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: false,
      },
    },
    Read: {
      screen: Read,
      navigationOptions: {
        title: "READ THIS WEEKS ARTICLES",
      },
    },
    NewsQ: {
      screen: NewsQ,
      navigationOptions: {
        title: "THIS WEEKS NEWS QUIZ",
        headerLeft: null,
      },
    },
    Guest: {
      screen: Guest,
      navigationOptions: {
        title: "THE REAL DEAL",
      },
    },
    Sign: {
      screen: Signup,
      navigationOptions: {
        title: "SIGN UP",
      },
    },
    LogIn: {
      screen: LogIn,
      navigationOptions: {
        title: "LOG IN",
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions:{
        title: "SETTINGS",
      },
    },
    ShopScreen: {
      screen: ShopScreen,
      navigationOptions:{
        title: "SHOP",
      },
    },
    Toolbar: Toolbar,
    Reset: Reset,
    VerifyReset: VerifyReset,
    UpdatePassword: UpdatePassword,
    Developer: Developer,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({navigation}) => ({
      headerTintColor: "#FFFFFF",
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: themes.PURPLE_LIGHT,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        alignSelf: "center",
        fontSize: 23,
        fontFamily: themes.DEFAULT_FONT,
      },
      headerRight:  (
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Ionicons name="ios-settings-sharp" size={24} color="black" />
        </TouchableOpacity>
      ),
    }),
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
