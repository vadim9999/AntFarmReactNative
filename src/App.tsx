import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import AppDrawer from 'AppDrawer/AppDrawer';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AppDrawer />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
