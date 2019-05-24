import React from 'react';
import {
  View, ActivityIndicator, Alert,
} from 'react-native';
import {
  Button,
  Text,
  Form,
  Item,
} from 'native-base';
import { writeToDevice, onStartScan, connectToDevice } from '../selector/selector';
import DevicePicker from './DevicePicker';

import styles from './styles';

export default class Scan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: '',
      activity: true,
      devices: [],

    };
    this.onScan = this.onScan.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.getItem = this.getItem.bind(this);
  }

  componentWillMount() {
    this.onScan();
  }

  onConnect() {
    const device = this.state.devices.find(device => device.address == this.state.device);

    connectToDevice(device).then(() => {
      console.log('Connected!');
      this.props.enableEditing();
      const data = {
        request: 'getWIFIData',
      };
      writeToDevice(JSON.stringify(data));
    }).catch((ex) => {
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

    onStartScan().then((devices) => {
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
      .catch((ex) => {
        console.warn(ex);
      });
  }

  getItem(itemValue) {
    this.setState({ device: itemValue });
  }

  render() {
    return (
      <View style={styles.scan_block}>
        <Form style={styles.scan_form}>
          <Item picker>

            <Text> Виберіть ферму:</Text>

            <DevicePicker
              getItem={this.getItem}
              devices={this.state.devices}
            />
          </Item>

        </Form>

        <View style={styles.button_block}>
          <Button
            onPress={this.onScan}
            rounded
          >
            <ActivityIndicator animating={this.state.activity} style={styles.spinner} size="small" color="red" />
            <Text>Сканувати</Text>
          </Button>
          <Button
            onPress={this.onConnect}
            rounded
          >
            <Text>Підключитися</Text>
          </Button>

        </View>
      </View>
    );
  }
}
