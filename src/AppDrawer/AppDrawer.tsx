import React from 'react';
import AboutApplication from 'screens/aboutApplication/AboutApplication';
import MainScreen from 'screens/main/MainScreen';
import { Box } from 'native-base';
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

class AppDrawer extends React.Component<Props & PropsFromRedux, {}> {
  async componentDidMount() {
    try {
      let isBluetoothAvailable =
        await RNBluetoothClassic.isBluetoothAvailable();
      this.props.setIsBluetoothAvailable(isBluetoothAvailable);
      console.log('is22', isBluetoothAvailable);
    } catch (err) {
      console.log("err");
    }
  }

  render() {
    console.log('render');

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
