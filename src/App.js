import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { loadAsync } from "expo-font";
import AppLoading from "expo-app-loading";
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
import DeveloperNewsQ from "./screens/DeveloperNewsQ";
import DeveloperArtQ from "./screens/DeveloperArtQ"
import DeveloperQuestions from "./screens/DeveloperQuestions";
import DeveloperArticles from "./screens/DeveloperArticles";
import ArtQWaiting from "./screens/ArtQWaiting";
import React from "react";
import { TouchableOpacity } from "react-native";
import themes from "./styles/themes";
import { Ionicons } from "@expo/vector-icons";
import UserPolicy from "./screens/UserPolicy";
import Scoreboard from "./screens/components/Scoreboard";
import NewsQReady from "./screens/NewsQReady";
import NewsQDone from "./screens/NewsQDone";

/**
 * @summary This file contains the stack navigator
 * for navigating between different screens.
 */
const navigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: () => null
      },
    },
    Read: {
      screen: Read,
      navigationOptions: {
        title: "LÄS VECKANS ARTIKLAR"
      },
    },
    NewsQ: {
      screen: NewsQ,
      navigationOptions: {
        title: "VECKANS NYHETSFRÅGOR",
        headerLeft: () => null,
        headerRight: () => null,
      },
    },
    GameScreen: {
      screen: GameScreen,
      navigationOptions: {
        title: "THE REAL DEAL"
      },
    },
    Sign: {
      screen: Signup,
      navigationOptions: {
        title: "REGISTRERA"
      },
    },
    LogIn: {
      screen: LogIn,
      navigationOptions: {
        title: "LOGGA IN"
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: "INSTÄLLNINGAR",
        headerRight: () => null,
      },
    },
    ShopScreen: {
      screen: ShopScreen,
      navigationOptions: {
        title: "BUTIK"
      },
    },
    ArtQWaiting: {
      screen: ArtQWaiting,
      navigationOptions: {
        title: "ARTIKEL QUIZ"
      },
    },
    ArtQ: {
      screen: ArtQ,
      navigationOptions: {
        title: "ARTIKEL QUIZ",
        headerRight: () => null,
      },
    },
    NewsQReady: {
      screen: NewsQReady,
      navigationOptions: {
        title: "NYHETSFRÅGOR"
      }
    },
    Scoreboard: {
      screen: Scoreboard,
      navigationOptions: {
        title: "RESULTAT"
      }
    },
    UserPolicy: {
      screen: UserPolicy,
      navigationOptions: {
        title: "ANVÄNDARPOLICY"
      }
    },
    Reset: {
      screen: Reset,
      navigationOptions: {
        title: null
      }
    },
    VerifyReset: {
      screen: VerifyReset,
      navigationOptions: {
        title: null
      }
    },
    UpdatePassword: {
      screen: UpdatePassword,
      navigationOptions: {
        title: null
      }
    },
    Developer: {
      screen: Developer,
      navigationOptions: {
        title: "UTVECKLARE"
      }
    },
    DeveloperNewsQ: {
      screen: DeveloperNewsQ,
      navigationOptions: {
        title: "NYHETSFRÅGOR",
        
      }
    },
    DeveloperArtQ: {
      screen: DeveloperArtQ,
      navigationOptions: {
        title: "ARTIKEL QUIZ"
      }
    },
    DeveloperQuestions: {
      screen: DeveloperQuestions,
      navigationOptions: {
        title: "FRÅGOR"
      }
    },
    DeveloperArticles: {
      screen: DeveloperArticles,
      navigationOptions: {
        title: "ARTIKLAR"
      }
    },
    NewsQDone: {
      screen: NewsQDone,
      navigationOptions: {
        title: "RESULTAT",
        headerLeft: () => null,
        headerRight: () => null,
      },
    },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      headerTintColor: "#FFFFFF",
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: themes.PURPLE_LIGHT,
        height: themes.HEIGHT,
      },
      headerTitleStyle: {
        fontSize: themes.FONT_SIZE_EXTRA_SMALL,
        fontFamily: themes.DEFAULT_FONT,
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          style={{ marginRight: themes.MARGIN_MEDIUM }}
        >
          <Ionicons
            name="ios-settings-sharp"
            size={themes.FONT_SIZE_EXTRA_SMALL}
            color="black"
          />
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

  async loadLocalFonts() {
    await loadAsync({
      Ramaraja: require("./assets/fonts/Ramaraja.ttf"),
      "Roboto Slab": require("./assets/fonts/RobotoSlab-Regular.ttf"),
    });
  }

  render() {
    const Container = createAppContainer(navigator);
    if (!this.state.fontLoaded)
      return (
        <AppLoading
          startAsync={this.loadLocalFonts}
          onFinish={() => {
            this.setState({ fontLoaded: true });
          }}
          onError={console.warn}
        />
      );
    return <Container />;
  }
}
