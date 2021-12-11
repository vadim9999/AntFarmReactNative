import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import AboutApplication from './screens/aboutApplication/AboutApplication';
import MainScreen from 'screens/main/MainScreen';
import { NativeBaseProvider, Box, Center } from 'native-base';

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
    // TODO setting up drawer
    <NavigationContainer>
      <NativeBaseProvider>
        <MainScreen />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
