import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from './screens/HomeScreen';
import ContGuest from './screens/ContGuest';
import Signup from './screens/Signup';
import LogIn from './screens/LogIn';

const navigator = createStackNavigator (
  {
    Home: HomeScreen,
    Cont: ContGuest,
    Sign: Signup,
    LogIn: LogIn
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
)

export default createAppContainer(navigator);