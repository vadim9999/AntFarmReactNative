import React from 'react';
import { Text } from 'react-native-svg';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export default class WifiSettings extends React.Component {
  componentDidMount = async () => {
    // const connected = await RNBluetoothClassic.getConnectedDevice;
    // console.log('connected', connected);
  };
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
  render() {
    return <Text>H</Text>;
  }
}
