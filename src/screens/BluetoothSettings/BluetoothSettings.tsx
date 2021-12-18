import { Box, Spinner, Text } from 'native-base';
import React from 'react';
import ScanForm from './components/ScanForm/ScanForm';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { ScanFormValues } from './components/ScanForm/ScanForm.types';
import { Props, State } from './BluetoothSettings.types';

const mockDevices = [
  {
    name: 'one',
    address: '12:12',
  },
];
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
  componentDidMount = () => {
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

  onConnect = async (formValues: ScanFormValues) => {
    this.setState({ isLoading: true });

    try {
      const foundedDevice = this.state.devices.find(
        device => device.address === formValues.deviceAddress,
      );

      if (!foundedDevice) {
        // TODO add Notification
        throw Error('Device not found');
      }

      const isConnectedToAntFarm = await foundedDevice.connect({
        connectorType: 'rfcomm',
        delimiter: '\n',
        charset: 'utf-8',
      });

      if (!isConnectedToAntFarm) {
        // Alert.alert('Сталася помилка при підключенні до ферми');
        throw Error('Failed to connect');
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onScan = () => {
    this.setState({
      isLoading: true,
    });

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
    // const deviceList = this.state.devices.map(device => ({
    //   name: device.name,
    //   address: device.address,
    // }));

    const deviceList = mockDevices;
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
