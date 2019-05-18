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

            if (networks != undefined && networks.length >= 1) {
                
                // if (networks.length >= 1 & this.state.network == ""){
                //     // this.props.getNetwork(networks[0])
                // }
            
            // if(this.state.network === ""){
            //     this.setState({
            //         network:networks[0]
            //     })
            // }
                
                // if (connectedRouter != "") {
                //     // @TODO not working 
                //     var index = networks.indexOf(connectedRouter)
                //     // console.log("index");
                //     // console.log(index);


                //     // if (index != -1) {
                //     //     var tmp = networks[0]
                //     //     networks[0] = networks[index] + " підключено"
                //     //     networks[index] = tmp
                //     // }
                // }


                return (
                    networks.map(network => {
                        if (network != undefined){
                            
                                return <Picker.Item key={uuidv1} label={network} value={network} />
                            
                            
                                
                        }

                        
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

