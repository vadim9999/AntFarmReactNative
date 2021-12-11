import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AboutApplication from './screens/aboutApplication/AboutApplication';
import MainScreen from './screens/main/MainScreen';

// const MyDrawerNavigator = createDrawerNavigator({
//   HomeScreen: {
//     screen: MainScreen,
//   },
//   About: {
//     screen: AboutApplication,
//   },
// });

// const App = createAppContainer(MyDrawerNavigator);

const App = () => {
  return (
    <NavigationContainer>
      <MainScreen />
    </NavigationContainer>
  );
};

export default App;
