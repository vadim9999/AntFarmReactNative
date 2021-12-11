import React from 'react';
import {createAppContainer, createDrawerNavigator} from 'react-navigation';
import AboutApplication from './screens/aboutApplication/AboutApplication';
import MainScreen from './screens/main/MainScreen';
import {Text} from 'react-native';

const MyDrawerNavigator = createDrawerNavigator({
  HomeScreen: {
    screen: MainScreen,
  },
  About: {
    screen: AboutApplication,
  },
});

// const App = createAppContainer(MyDrawerNavigator);

const App = () => {
  return <Text>Hello</Text>;
};

export default App;
