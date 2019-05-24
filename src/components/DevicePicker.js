import React from 'react';
import { Picker } from 'native-base';
import uuidv1 from 'uuid/v1'
import styles from './styles';

export default class DevicePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            device: "",
            activity: true,
            devices: []
        }
    }

    getListOfDevices(devices) {
       
        if (devices != undefined && devices.length > 0) {

            return (
                devices.map(device => {
                    var pair = "";
                    if (device.uuids != undefined & device["uuids"].length > 0) {
                        pair = "Пара"
                    }
                    if (device != undefined & device.name != undefined)
                        return <Picker.Item key={uuidv1} label={device.name + " " + device.address + " " + pair} value={device.address} />
                    else if (device != undefined & device.address != undefined) {
                        return <Picker.Item key={uuidv1} label={"NoName" + " " + device.address} value={device.address} />
                    } else return <Picker.Item key={uuidv1} label={""} value={""} />
                }
                ))
        }
    }

    render() {
        return (
            <Picker
                selectedValue={this.state.device}
                style={styles.device_picker}
                onValueChange={(itemValue, itemIndex) => {
                    this.setState({ device: itemValue })
                    this.props.getItem(itemValue)
                }}>
                {this.getListOfDevices(this.props.devices)}

            </Picker>

        )
    }
}

