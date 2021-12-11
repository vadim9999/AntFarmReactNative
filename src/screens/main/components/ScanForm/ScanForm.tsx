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
} from 'native-base';
import {
  writeToDevice,
  onStartScan,
  connectToDevice,
} from '../../../../selector/selector';
import DevicePicker from '../DevicePicker/DevicePicker';
// import { AntDesign } from '@expo/vector-icons';

import styles from '../../../../components/styles';
import { BluetoothDevice } from 'services/bluetooth-service/types';

const mockDevices = [
  {
    name: 'one',
    address: '12:12',
    uuids: '323',
  },
];

interface Props {}

interface State {
  device: string;
  activity: boolean;
  devices: BluetoothDevice[];
}

export default class ScanForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      device: '',
      activity: true,
      devices: mockDevices,
    };
    this.onScan = this.onScan.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.setBluetoothDevice = this.setBluetoothDevice.bind(this);
  }

  // TODO fix error
  // componentWillMount() {
  //   this.onScan();
  // }

  onConnect() {
    const device = this.state.devices.find(
      device => device.address == this.state.device,
    );

    connectToDevice(device)
      .then(() => {
        console.log('Connected!');
        this.props.enableEditing();
        const data = {
          request: 'getWIFIData',
        };
        writeToDevice(JSON.stringify(data));
      })
      .catch(ex => {
        Alert.alert('Сталася помилка при підключенні до ферми');
        console.warn(ex);
      });
  }

  onScan() {
    if (this.state.activity !== true) {
      this.setState({
        activity: true,
      });
    }

    onStartScan()
      .then(devices => {
        if (devices !== undefined && devices.length > 0) {
          this.setState({
            devices,
            device: devices[0].address,
            activity: false,
          });
        } else {
          this.setState({
            activity: false,
          });
        }
      })
      .catch(ex => {
        console.warn(ex);
      });
  }

  setBluetoothDevice(itemValue: string) {
    this.setState({ device: itemValue });
  }

  render() {
    return (
      <>
        <FormControl isRequired isInvalid={!this.state.device}>
          <FormControl.Label _text={{ bold: true }}>
            Виберіть ферму
          </FormControl.Label>
          <DevicePicker
            setBluetoothDevice={this.setBluetoothDevice}
            devices={this.state.devices}
          />
        </FormControl>
        {/* TODO make this button like a refresh on the right from select */}
        <IconButton
          colorScheme="indigo"
          // key={variant}
          variant="solid"
          size="sm"
          onPress={this.onScan}
          icon={<SearchIcon />}
        />
        {/* <Button onPress={this.onScan}>
          <ActivityIndicator
            animating={this.state.activity}
            style={styles.spinner}
            size="small"
            color="red"
          />
        </Button> */}
        <View style={styles.scan_block}>
          {/* <View style={styles.button_block}>
          
          <Button
            onPress={this.onConnect}
            rounded
          >
            <Text>Підключитися</Text>
          </Button>

        </View> */}
        </View>
      </>
    );
  }
}
