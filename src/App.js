import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from './screens/HomeScreen';
import ContGuest from './screens/ContGuest';
import Signup from './screens/Signup';
import LogIn from './screens/LogIn';
import Settings from './screens/Settings';
import Toolbar from './screens/components/Toolbar'

const navigator = createStackNavigator (
  {
    Home: HomeScreen,
    Cont: ContGuest,
    Sign: Signup,
    LogIn: LogIn,
    Settings: Settings,
    Toolbar: Toolbar
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: false
    }
  }
)

export default createAppContainer(navigator);