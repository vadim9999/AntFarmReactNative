import React from 'react';
import { StyleSheet, Text, View, Button, Picker, ActivityIndicator, Alert } from 'react-native';
import uuidv1 from 'uuid/v1'

export default class NetworkPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            network: "",
            // activity: true,
            // networks: []

        }
    }
    getListOfNetworks(networks) {
        console.log("getListOfNetworks");
        console.log(networks);
        
        if (networks != undefined & networks.length >= 1) {
            if (networks.length >= 1 & this.state.network == ""){
                // this.props.getNetwork(networks[0])
            }
                
            return (
                networks.map(network => {
                    if (network != undefined)
                        return <Picker.Item key = {uuidv1} label={network } value={network} />
                    // else return <Picker.Item label={""} value={""} />
                    } 
                
                ))
        }
    }

    render() {  
        // console.log(this.state.enabled);
        // {/* enabled= {this.state.enabled} */}
        return (

            <Picker
                enabled= {this.props.enabled}
                selectedValue={this.state.network}
                style={{ height: 50, width: '100%' }}
                onValueChange={(itemValue, itemIndex) => {
                    console.log("Changed values");
                    this.setState({network: itemValue})
                    this.props.getNetwork(itemValue)
                }
                }>
                {this.getListOfNetworks(this.props.networks)}

            </Picker>


        )
    }
}

