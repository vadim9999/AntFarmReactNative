import React from 'react';
import { StyleSheet, Text, View, Button, Picker, ActivityIndicator, Alert } from 'react-native';
import uuidv1 from 'uuid/v1'

export default class NetworkPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            network: "",
        }
    }

    getListOfNetworks(networks) {
        if (networks != undefined && networks.length >= 1) {
            return (
                networks.map(network => {
                    if (network != undefined) {
                        return <Picker.Item key={uuidv1} label={network} value={network} />
                    }
                }

                ))
        }

    }

    render() {
        return (
            <Picker
                enabled={this.props.enabled}
                selectedValue={this.state.network}
                style={{ height: 50, width: '100%' }}
                onValueChange={(itemValue, itemIndex) => {
                    console.log("Changed values");
                    this.setState({ network: itemValue })
                    this.props.getNetwork(itemValue)
                }
                }>

                {this.getListOfNetworks(this.props.networks)}

            </Picker>
        )
    }
}

