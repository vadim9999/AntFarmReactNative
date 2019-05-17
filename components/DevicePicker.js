import React from 'react';
import { Picker } from 'react-native';
import uuidv1 from 'uuid/v1'

export default class DevicePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            device: "",
            activity: true,
            devices :[]

        }
        
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.props.devices === nextProps.number) {
    //         return false;
    //       } else {
    //         return true;
    //       }
    //   }

    getListOfDevices(devices) {
        console.log("getListOfDevices");
        // if (this.state.devices != this.props.devices){
        console.log("NotEqual");
        
        
        if (devices != undefined) {
            // if (devices.length >= 1 & this.state.device == ""){
            //     this.props.getItem(devices[0].address)
            // }
                
            return (
                devices.map(device => {
                    var pair = "";
                    if (device.uuids != undefined & device["uuids"].length > 0) {
                        pair = "Пара"
                    }
                    if (device != undefined & device.name != undefined)
                        return <Picker.Item key = {uuidv1} label={device.name + " " + device.address + " " + pair} value={device.address} />
                    else if (device != undefined & device.address != undefined) {
                        return <Picker.Item key = {uuidv1} label={"NoName" + " " + device.address} value={device.address} />
                    } else return <Picker.Item key = {uuidv1} label={""} value={""} />
                }
                ))
        }
    // }
        // var devices = ["pi","samsung"];

    }
    
    render() {
        return (

            <Picker
                selectedValue={this.state.device}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) => {
            console.log("Changed values");
            this.setState({device: itemValue})
            this.props.getItem(itemValue)
        }}>
                {this.getListOfDevices(this.props.devices)}

            </Picker>


        )
    }
}

