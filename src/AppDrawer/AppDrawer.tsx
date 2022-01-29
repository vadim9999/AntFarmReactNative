import React from 'react';
import AboutApplication from 'screens/AboutApplication/AboutApplication';
import { Box } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent/CustomDrawerContent';
import BluetoothSettings from 'screens/BluetoothSettings/BluetoothSettings';
import WifiSettings from 'screens/WifiSettings/WifiSettings';
import { AppDrawerProps } from './AppDrawer.types';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { errorToast } from 'utils/errorToast';

const Drawer = createDrawerNavigator();

class AppDrawer extends React.Component<AppDrawerProps, {}> {
  constructor(props: AppDrawerProps) {
    super(props);
  }

  async componentWillUnmount() {
    try {
      const connectedDevices = await RNBluetoothClassic.getConnectedDevices();

      connectedDevices.forEach(connectedDevice => {
        connectedDevice.disconnect();
      });
    } catch (error) {
      errorToast(error);
    }
  }

  render() {
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
}

export default AppDrawer;
