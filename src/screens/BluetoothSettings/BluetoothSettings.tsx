import { Box, Spinner, Text, Toast } from 'native-base';
import React from 'react';
import ScanForm from './components/ScanForm/ScanForm';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { ScanFormValues } from './components/ScanForm/ScanForm.types';
import { Props, State } from './BluetoothSettings.types';
import { PermissionsAndroid } from 'react-native';

const mockDevices = [
  {
    name: 'one',
    address: '12:12',
  },
];

const requestAccessFineLocationPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Access fine location required for discovery',
      message:
        'In order to perform discovery, you must enable/allow ' +
        'fine location access.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export default class BluetoothSettings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
      devices: [],
    };
    // this.readSubscription = null;
  }

  // readSubscription: BluetoothEventSubscription | null;
  componentDidMount = async () => {
    try {
      let isBluetoothAvailable =
        await RNBluetoothClassic.isBluetoothAvailable();
      console.log('isBluetoothAvailable', isBluetoothAvailable);

      if (!isBluetoothAvailable) {
        throw new Error('Bluetooth is not available for current device!');
      }

      let enabled = await RNBluetoothClassic.isBluetoothEnabled();
      console.log('is enabled?', enabled);

      if (!enabled) {
        throw new Error('Bluetooth is not enabled! Enable it!');
      }

      let granted = await requestAccessFineLocationPermission();

      if (!granted) {
        throw new Error('Access fine location was not granted');
      }

      RNBluetoothClassic.startDiscovery().then(devices => {
        this.setState({
          devices,
        });
      });
    } catch (error) {
      Toast.show({
        title: (error as Error).message,
        status: 'error',
      });
      console.error((error as Error).message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onConnect = async (formValues: ScanFormValues) => {
    this.setState({ isLoading: true });
    try {
      const foundedDevice = this.state.devices.find(
        device => device.address === formValues.deviceAddress,
      );

      if (!foundedDevice) {
        // TODO add Notification
        throw new Error('Device not found');
      }

      const isConnectedToAntFarm = await foundedDevice.connect({
        connectorType: 'rfcomm',
        delimiter: '\n',
        charset: 'utf-8',
      });

      if (!isConnectedToAntFarm) {
        // Alert.alert('Сталася помилка при підключенні до ферми');
        throw new Error('Failed to connect');
      }
    } catch (error) {
      console.error((error as Error).message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onScan = async () => {
    this.setState({
      isLoading: true,
    });

    const paired = await RNBluetoothClassic.getBondedDevices();
    console.log('paired', paired);

    RNBluetoothClassic.startDiscovery()
      .then(devices => {
        this.setState({
          devices,
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const deviceList = this.state.devices.map(device => ({
      name: device.name,
      address: device.address,
    }));

    // const deviceList = mockDevices;
    return (
      <>
        <Box>
          <Text>Підключення з фермою відсутнє</Text>
          <Text>Підключено до мурашиної ферми</Text>
        </Box>
        <Spinner
          size="lg"
          // accessibilityLabel="Loading"
          animating={this.state.isLoading}
        />
        <Box>
          <ScanForm
            onRefresh={this.onScan}
            onConnect={this.onConnect}
            devices={deviceList}
          />
        </Box>
        <Box>
          <Text>Інформація</Text>
        </Box>
      </>
    );
  }
}
