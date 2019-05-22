import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import AboutApplication from "./screens/aboutApplication/AboutApplication"
import MainScreen from "./screens/main/MainScreen"

const MyDrawerNavigator = createDrawerNavigator(
  {
    HomeScreen: {
      screen: MainScreen,
    },
    About: {
      screen: AboutApplication,
    },

  }
);

const App = createAppContainer(MyDrawerNavigator);

export default App;