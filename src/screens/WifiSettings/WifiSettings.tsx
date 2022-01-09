import React from 'react';
import RNBluetoothClassic, {
  BluetoothEventSubscription,
} from 'react-native-bluetooth-classic';
// import { connect, ConnectedProps } from 'react-redux';
// import { RootState } from 'redux/store/store';
// import { setDeviceAddress } from 'redux/slices/deviceSlice';
// import { getDeviceAddress } from 'redux/selectors/selector';
import { Box, Spinner, Text, Toast } from 'native-base';
import { connector, PropsFromRedux } from './connector';
import { State } from './WifiSettings.types';
import { checkBluetooth } from 'screens/BluetoothSettings/helper';
import WifiForm from './components/WifiForm/WifiForm';
import { WifiFormValues } from './components/WifiForm/WifiForm.types';

interface Props extends PropsFromRedux {}

enum WifiRequst {
  GetWIFIData = 'getWIFIData',
  SetWIFIData = 'setWIFIData',
}

class WifiSettings extends React.Component<Props, State> {
  readSubscription: BluetoothEventSubscription | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      networks: [],
    };
  }

  async componentDidMount() {
    try {
      await checkBluetooth();

      if (!this.props.deviceAddress?.length) {
        throw new Error('Device is not set');
      }

      this.setState({ isLoading: true });

      const connectedDevice = await RNBluetoothClassic.getConnectedDevice(
        this.props.deviceAddress,
      );

      this.readSubscription = connectedDevice.onDataReceived(response => {
        try {
          const receivedData = JSON.parse(response.data);
          if (receivedData.request !== WifiRequst.GetWIFIData) {
            return;
          }

          let networks = receivedData.data;

          if (networks?.length) {
            this.setState({
              networks,
            });
          }
        } catch (error) {
          Toast.show({
            title: (error as Error).message,
            status: 'error',
          });
          // eslint-disable-next-line no-console
          console.log((error as Error).message);
        }
      });

      const data = {
        request: WifiRequst.GetWIFIData,
      };

      connectedDevice.write(JSON.stringify(data), 'utf-8');
    } catch (error) {
      // TODO move to utils
      Toast.show({
        title: (error as Error).message,
        status: 'error',
      });
      // eslint-disable-next-line no-console
      console.log((error as Error).message);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  onConnect = async (wifiFormValues: WifiFormValues) => {
    const data = {
      request: WifiRequst.SetWIFIData,
      network: wifiFormValues.network,
      password: wifiFormValues.password,
    };

    if (!this.props.deviceAddress) {
      Toast.show({
        title: 'Не підключено до ферми',
        status: 'error',
      });
      // eslint-disable-next-line no-console
      console.log('Не підключено до ферми');
      return;
    }

    const connectedDevice = await RNBluetoothClassic.getConnectedDevice(
      this.props.deviceAddress,
    );

    connectedDevice.write(JSON.stringify(data), 'utf-8');
    //     this.props.onChangeActivity(true);
    //     this.setState({
    //       routerPassword: '',
    //     });
  };

  onRefresh = async () => {
    await checkBluetooth();

    if (!this.props.deviceAddress?.length) {
      throw new Error('Device is not set');
    }

    const connectedDevice = await RNBluetoothClassic.getConnectedDevice(
      this.props.deviceAddress,
    );

    const data = {
      request: WifiRequst.GetWIFIData,
    };

    connectedDevice.write(JSON.stringify(data), 'utf-8');
  };

  componentWillUnmount() {
    this.readSubscription?.remove();
  }

  render() {
    return (
      <Box>
        {this.state.isLoading ? <Spinner size="lg" /> : null}
        <Text>Address: {this.props.deviceAddress}</Text>
        <WifiForm
          onRefresh={this.onRefresh}
          onConnect={this.onConnect}
          networks={['onenetwork']}
        />
        <Text>Info</Text>
      </Box>
    );
  }
}

export default connector(WifiSettings);
