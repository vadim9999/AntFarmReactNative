import React from 'react';
import { Text } from 'react-native-svg';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'redux/store/store';
import { setDeviceAddress } from 'redux/slices/deviceSlice';
import { getDeviceAddress } from 'redux/selectors/selector';

interface Props extends PropsFromRedux {}

class WifiSettings extends React.Component<Props, {}> {
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
    console.log(this.props.deviceAddress);

    return <Text>H</Text>;
  }
}

const mapStateToProps = (state: RootState) => ({
  deviceAddress: getDeviceAddress(state),
});

const mapDispatchToProps = { setDeviceAddress };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(WifiSettings);
