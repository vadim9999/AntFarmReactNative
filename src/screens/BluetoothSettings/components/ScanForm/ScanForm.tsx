import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import {
  Button,
  Text,
  Form,
  Item,
  FormControl,
  View,
  Box,
  IconButton,
  SearchIcon,
  Spinner,
} from 'native-base';

import DevicePicker from '../DevicePicker/DevicePicker';

import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothEventSubscription,
  BluetoothEventType,
} from 'react-native-bluetooth-classic';
import { getArrWithConnNetwork } from 'selector/selector';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const mockDevices = [
  {
    name: 'one',
    address: '12:12',
    uuids: '323',
  },
];

interface Props {}

interface State {
  selectedDeviceAddress: string;
  isLoading: boolean;
  devices: BluetoothDevice[];
}

export default class ScanForm extends React.Component<Props, State> {
  // readSubscription: BluetoothEventSubscription | null;

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedDeviceAddress: '',
      isLoading: true,
      devices: [],
    };

    this.onScan = this.onScan.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.setBluetoothDevice = this.setBluetoothDevice.bind(this);
    // this.readSubscription = null;
  }

  componentDidMount = () => {
    try {
      RNBluetoothClassic.startDiscovery().then(devices => {
        this.setState({
          ...this.state,
          devices,
          isLoading: false,
        });
      });
    } catch (e) {
      console.error('error', e);
    } finally {
      // this.setState({ devices, discovering: false });
    }
  };

  onConnect = async () => {
    try {
      const foundedDevice = this.state.devices.find(
        device => device.address === this.state.selectedDeviceAddress,
      );

      if (!foundedDevice) {
        console.log('error');

        return;
      }

      const isConnectedToAntFarm = await foundedDevice.connect({
        connectorType: 'rfcomm',
        delimiter: '\n',
        charset: 'utf-8',
      });

      if (!isConnectedToAntFarm) {
        Alert.alert('Сталася помилка при підключенні до ферми');
        throw Error('Сталася помилка при підключенні до ферми');
      }

      console.log('connected');

      // TODO move this logic into WifiSettings screen
      // this.readSubscription = foundedDevice.onDataReceived(response => {
      //   try {
      //     const receivedData = JSON.parse(response.data);
      //     if (receivedData.request !== 'getWIFIData') {
      //       return;
      //     }

      //     let networks = receivedData.data;
      //     const connectedNetwork = receivedData.router;
      //     networks = getArrWithConnNetwork(networks, connectedNetwork);

      //     if (networks?.length) {
      //       console.log('networks', networks);

      //       // this.setState({
      //       //   networks,
      //       //   network: networks[0],
      //       //   activity: false,
      //       // });
      //     }
      //   } finally {
      //   }
      //   console.log('data', response);
      // });

      // console.log('founded', foundedDevice);

      // const data = {
      //   request: 'getWIFIData',
      // };

      // const sent = await foundedDevice?.write(JSON.stringify(data), 'utf-8');

      // if (sent) {
      //   console.log('sentSuccess');
      // }
    } catch (err) {
      console.error(err);
    }
  };

  onScan() {
    if (this.state.activity !== true) {
      this.setState({
        activity: true,
      });
    }

    try {
      // TODO add check if discover is started
      RNBluetoothClassic.startDiscovery().then(devices => {
        this.setState({
          ...this.state,
          devices,
          isLoading: false,
        });
      });
    } catch (e) {
      console.error('error', e);
    } finally {
      // this.setState({ devices, discovering: false });
    }
    // onStartScan()
    //   .then(devices => {
    //     if (devices !== undefined && devices.length > 0) {
    //       this.setState({
    //         devices,
    //         device: devices[0].address,
    //         activity: false,
    //       });
    //     } else {
    //       this.setState({
    //         activity: false,
    //       });
    //     }
    //   })
    //   .catch(ex => {
    //     console.warn(ex);
    //   });
  }

  setBluetoothDevice(itemValue: string) {
    this.setState({ selectedDeviceAddress: itemValue });
  }

  render() {
    return (
      <>
        <FormControl isRequired isInvalid={!this.state.selectedDeviceAddress}>
          <FormControl.Label _text={{ bold: true }}>
            Виберіть ферму
          </FormControl.Label>
          <DevicePicker
            setBluetoothDevice={this.setBluetoothDevice}
            devices={this.state.devices}
          />
        </FormControl>
        <Spinner
          size="lg"
          // accessibilityLabel="Loading"
          animating={this.state.isLoading}
        />
        <Button
          onPress={this.onScan}
          disabled={!this.state.selectedDeviceAddress}>
          Оновити список
        </Button>
        <Button
          onPress={this.onConnect}
          disabled={!this.state.selectedDeviceAddress}>
          Підключитися
        </Button>
      </>
    );
  }
}
