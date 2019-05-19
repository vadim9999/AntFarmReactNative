import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation';
import HomeScreen from "./HomeScreen"
import MainScreen from "./MainScreen"
// const MainNavigator = createStackNavigator({
//   Home: {screen: HomeScreen},
//   Profile: {screen: MainScreen},
// });

const MyDrawerNavigator = createDrawerNavigator({
    HomeScreen: {
      screen: HomeScreen,
    },
    Notifications: {
      screen: MainScreen,
    },
  });

const App = createAppContainer(MyDrawerNavigator);


export default App;