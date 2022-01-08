import { Box, Spinner, Text, Toast } from 'native-base';
import React from 'react';
import ScanForm from './components/ScanForm/ScanForm';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { ScanFormValues } from './components/ScanForm/ScanForm.types';
import { Props, State } from './BluetoothSettings.types';
import { checkBluetooth } from './helper';
import { connector, PropsFromRedux } from './connector';

const mockDevices = [
  {
    name: 'one',
    address: '12:12',
  },
];

type BluetoothSettingsProps = Props & PropsFromRedux;

class BluetoothSettings extends React.Component<BluetoothSettingsProps, State> {
  constructor(props: BluetoothSettingsProps) {
    super(props);

    this.state = {
      isLoading: false,
      devices: [],
    };
  }

  async componentDidUpdate(prevProps: BluetoothSettingsProps) {
    // NOTE needs for first automated start discovering
    if (
      prevProps.isBluetoothAvailable !== this.props.isBluetoothAvailable &&
      this.props.isBluetoothAvailable
    ) {
      try {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ isLoading: true });

        await checkBluetooth();

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
        // eslint-disable-next-line no-console
        console.log((error as Error).message);
      } finally {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ isLoading: false });
      }
    }
  }

  onConnect = async (formValues: ScanFormValues) => {
    this.setState({ isLoading: true });

    try {
      const foundedDevice = this.state.devices.find(
        device => device.address === formValues.deviceAddress,
      );

      if (!foundedDevice) {
        throw new Error('Device not found');
      }

      const isConnectedToAntFarm = await foundedDevice.connect({
        connectorType: 'rfcomm',
        delimiter: '\n',
        charset: 'utf-8',
      });

      if (!isConnectedToAntFarm) {
        throw new Error('Failed to connect');
      }

      this.props.setDeviceAddress(foundedDevice.address);
    } catch (error) {
      Toast.show({
        title: (error as Error).message,
        status: 'error',
      });
      // eslint-disable-next-line no-console
      console.log((error as Error).message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onScan = async () => {
    try {
      this.setState({
        isLoading: true,
      });

      if (!this.props.isBluetoothAvailable) {
        throw new Error('Bluetooth is not available on this device');
      }

      await checkBluetooth();

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
      // eslint-disable-next-line no-console
      console.log((error as Error).message);
    } finally {
      this.setState({ isLoading: false });
    }
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
          {this.props.isBluetoothAvailable ? null : (
            <Text>Bluetooth на цьому пристрої не доступний</Text>
          )}
          <Text>Підключено до мурашиної ферми</Text>
        </Box>
        {this.state.isLoading ? <Spinner size="lg" /> : null}
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

export default connector(BluetoothSettings);
