import { createAppContainer  } from "react-navigation";
import { createStackNavigator} from "react-navigation-stack";
import { loadAsync } from "expo-font";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import Signup from "./screens/Signup";
import LogIn from "./screens/LogIn";
import Settings from "./screens/Settings";
import Reset from "./screens/Reset";
import NewsQ from "./screens/NewsQ";
import ArtQ from "./screens/ArtQ";
import Read from "./screens/Read";
import ShopScreen from "./screens/ShopScreen";
import VerifyReset from "./screens/VerifyReset";
import UpdatePassword from "./screens/updatePassword";
import Developer from "./screens/Developer";
import ArtQWaiting from "./screens/ArtQWaiting";
import React from "react";
import { TouchableOpacity } from "react-native";
import themes from "./styles/themes";
import { Ionicons } from '@expo/vector-icons'; 
import UserPolicy from "./screens/UserPolicy";
import Scoreboard from "./screens/components/Scoreboard";
import NewsQReady from "./screens/NewsQReady";


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
    GameScreen: {
      screen: GameScreen,
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
    ArtQWaiting : {
      screen: ArtQWaiting,
      navigationOptions: {
        title: "ARTICLE QUIZ"
      }
    },
    ArtQ : {
      screen: ArtQ,
      navigationOptions: {
        title: "ARTICLE QUIZ",
      }
    },
    NewsQReady: NewsQReady,
    Scoreboard: Scoreboard,
    UserPolicy: UserPolicy,
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
        height: themes.HEIGHT
      },
      headerTitleStyle: {
        alignSelf: "center",
        fontSize: themes.FONT_SIZE_EXTRA_SMALL,
        fontFamily: themes.DEFAULT_FONT,
      },
      headerRight:  (
        <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={{marginRight: 15}}>
            <Ionicons name="ios-settings-sharp" size={themes.FONT_SIZE_EXTRA_SMALL} color="black"/>
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
      ///FIXME: Doesn't load succesfully when starting with Expo
      "Ramaraja": require("./assets/fonts/Ramaraja.ttf"),
      "Roboto Slab": require("./assets/fonts/RobotoSlab-Regular.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const Container = createAppContainer(navigator);
    return <Container />;
  }
}
