import React from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { writeToDevice, onStartScan, connectToDevice } from "../selector/selector"
import DevicePicker from "./DevicePicker"
import {

  Button,
  Text,
  Input,
  Form,
  Item,
  CheckBox,
  Body,
  ListItem,
  Picker,
  Row,
  Spinner

} from "native-base";

export default class Scan extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      device: "",
      activity: true,
      devices: []

    }
    this.onScan = this.onScan.bind(this)
    this.onConnect = this.onConnect.bind(this)
    this.getItem = this.getItem.bind(this)
  }

  componentWillMount() {
    this.onScan()
  }

  onConnect() {
    var device = this.state.devices.find(device => {
      return device.address == this.state.device
    })

    connectToDevice(device).then(() => {
      console.log("Connected!");
      this.props.enableEditing()
      var data = {
        "request": "getWIFIData"
      }
      writeToDevice(JSON.stringify(data))

    }).catch((ex) => {
      Alert.alert('Сталася помилка при підключенні до ферми')
      console.warn(ex);
    })
  }

  onScan() {

    if (this.state.activity != true) {
      this.setState({
        activity: true
      })
    }

    onStartScan().then(function (devices) {

      if (devices != undefined && devices.length > 0) {
        this.setState({
          devices: devices,
          device: devices[0].address,
          activity: false
        })
      }
      else {
        this.setState({
          activity: false
        })
      }

    }.bind(this)
    )
      .catch(function (ex) {
        console.warn(ex);
      });
  }

  getItem(itemValue) {
    this.setState({ device: itemValue })
  }

  render() {

    return (
      <View style={styles.scan_block}>
        <Form style={{ marginBottom: 5 }}>
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

            rounded>
            <ActivityIndicator animating={this.state.activity} style={{ marginLeft: 5 }} size="small" color="red" />
            <Text>Сканувати</Text>
          </Button>
          <Button
            onPress={this.onConnect}
            rounded>
            <Text>Підключитися</Text>
          </Button>

        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({

  picker_activity: {
    flexDirection: 'row'
  },
  button_block: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttons: {
    backgroundColor: 'steelblue',
    width: '50%'
  },
  scan_block: {
    paddingTop: '8%',
    flex: 1,
    height: 50,
    justifyContent: "center",

  }
});