import React from 'react';
import AboutApplication from 'screens/aboutApplication/AboutApplication';
import MainScreen from 'screens/main/MainScreen';
import { Box } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent/CustomDrawerContent';
import BluetoothSettings from 'screens/BluetoothSettings/BluetoothSettings';
import WifiSettings from 'screens/WifiSettings/WifiSettings';

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator drawerContent={CustomDrawerContent}>
        <Drawer.Screen
          name="BluetoothSettings"
          options={{
            headerTitle: 'Налаштування Bluetooth',
          }}
          component={BluetoothSettings}
        />
        <Drawer.Screen
          name="WifiSettings"
          options={{
            headerTitle: 'Налаштування Wifi',
          }}
          component={WifiSettings}
        />
        <Drawer.Screen
          name="AboutApp"
          options={{
            headerTitle: 'Про додаток',
          }}
          component={AboutApplication}
        />
      </Drawer.Navigator>
    </Box>
  );
}

export default AppDrawer;
