import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, Alert } from 'react-native';
import { writeToDevice, onStartScan, connectToDevice } from "../selector/selector"
import DevicePicker from "./DevicePicker"


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
        <Text style={{fontSize:20}}>Виберіть ферму</Text>
        <View style={styles.picker_activity}>
          <DevicePicker
            getItem={this.getItem}
            devices={this.state.devices}
          />
          <ActivityIndicator animating={this.state.activity} size="small" color="#0000ff" />
        </View>
        <View style={styles.button_block}>

          <View style={styles.buttons}>
            <Button
              onPress={this.onScan}
              width="40"
              title="Сканувати"
              color="#87CEEB"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>

          <View style={styles.buttons}>
            <Button
              onPress={this.onConnect}
              width="40"
              title="Підключитися"
              color="#87CEEB"
              accessibilityLabel="Learn more about this purple button"
            />

          </View>
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
  },
  buttons: {
    backgroundColor: 'steelblue',
    width: '50%'
  },
  scan_block: {
    paddingTop: '8%',
    flex: 1,
    height: 50,
    justifyContent: "center"
  }
});