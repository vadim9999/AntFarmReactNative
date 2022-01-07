import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import AppDrawer from 'AppDrawer/AppDrawer';
import { Provider } from 'react-redux';
import { store } from 'redux/store/store';
import AboutApplication from 'screens/aboutApplication/AboutApplication';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Provider store={store}>
          <AppDrawer />
        </Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
