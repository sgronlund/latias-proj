import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from './screens/HomeScreen';
import ContGuest from './screens/ContGuest';
import Signup from './screens/Signup';
import LogIn from './screens/LogIn';
import Settings from './screens/Settings';

const navigator = createStackNavigator (
  {
    Home: HomeScreen,
    Cont: ContGuest,
    Sign: Signup,
    LogIn: LogIn,
    Settings: Settings
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: null
    }
  }
)

export default createAppContainer(navigator);