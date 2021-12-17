import React from 'react';
import AboutApplication from 'screens/aboutApplication/AboutApplication';
import MainScreen from 'screens/main/MainScreen';
import { Box } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent/CustomDrawerContent';

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator drawerContent={CustomDrawerContent}>
        <Drawer.Screen
          name="SettingsBluetooth"
          options={{
            headerTitle: 'Налаштування Bluetooth',
          }}
          component={MainScreen}
        />
        <Drawer.Screen name="AboutApp" component={AboutApplication} />
      </Drawer.Navigator>
    </Box>
  );
}

export default AppDrawer;
