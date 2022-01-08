import React from 'react';
import AboutApplication from 'screens/aboutApplication/AboutApplication';
import MainScreen from 'screens/main/MainScreen';
import { Box, Toast } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent/CustomDrawerContent';
import BluetoothSettings from 'screens/BluetoothSettings/BluetoothSettings';
import WifiSettings from 'screens/WifiSettings/WifiSettings';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { connect } from 'react-redux';
import { setIsBluetoothAvailable } from 'redux/slices/deviceSlice';
import { connector, PropsFromRedux } from './connector';
import { Props } from './AppDrawer.types';

const Drawer = createDrawerNavigator();

type AppDrawerProps = Props & PropsFromRedux;

class AppDrawer extends React.Component<AppDrawerProps, {}> {
  constructor(props: AppDrawerProps) {
    super(props);
  }

  async componentDidMount() {
    try {
      let isBluetoothAvailable =
        await RNBluetoothClassic.isBluetoothAvailable();

      this.props.setIsBluetoothAvailable(isBluetoothAvailable);

      if (!isBluetoothAvailable) {
        throw new Error('Bluetooth is not available on this device');
      }
    } catch (error) {
      Toast.show({
        title: (error as Error).message,
        status: 'error',
      });
      // eslint-disable-next-line no-console
      console.log((error as Error).message);
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

export default connector(AppDrawer);
