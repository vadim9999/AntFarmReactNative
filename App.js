import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation';
import AboutApplication from "./src/screens/aboutApplication/AboutApplication"
import MainScreen from "./src/screens/main/MainScreen"
// const MainNavigator = createStackNavigator({
//   Home: {screen: HomeScreen},
//   Profile: {screen: MainScreen},
// });

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