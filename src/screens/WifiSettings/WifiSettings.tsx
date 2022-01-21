import React from 'react';
import RNBluetoothClassic, {
  BluetoothEventSubscription,
} from 'react-native-bluetooth-classic';
// import { connect, ConnectedProps } from 'react-redux';
// import { RootState } from 'redux/store/store';
// import { setDeviceAddress } from 'redux/slices/deviceSlice';
// import { getDeviceAddress } from 'redux/selectors/selector';
import { HStack, Center, Spinner, Text, Toast, VStack } from 'native-base';
import { connector, PropsFromRedux } from './connector';
import { ReceivedData, State, WifiRequst } from './WifiSettings.types';
import { checkBluetooth } from 'screens/BluetoothSettings/helper';
import WifiForm from './components/WifiForm/WifiForm';
import { WifiFormValues } from './components/WifiForm/WifiForm.types';
import { errorToast } from 'utils/errorToast';

interface Props extends PropsFromRedux {}

class WifiSettings extends React.Component<Props, State> {
  readSubscription: BluetoothEventSubscription | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      networks: [],
      connectedNetwork: null,
      ipAddress: null,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    (async () => {
      try {
        await checkBluetooth();

        if (!this.props.deviceAddress?.length) {
          throw new Error('Device is not set');
        }

        const connectedDevice = await RNBluetoothClassic.getConnectedDevice(
          this.props.deviceAddress,
        );

        this.readSubscription = connectedDevice.onDataReceived(response => {
          try {
            const receivedData: ReceivedData = JSON.parse(response.data);

            switch (receivedData.request) {
              case WifiRequst.GetWIFIData:
                if (receivedData.data?.length) {
                  this.setState({
                    networks: receivedData.data,
                    connectedNetwork: receivedData.router,
                  });

                  if (receivedData.router.length) {
                    connectedDevice.write(
                      JSON.stringify({
                        request: WifiRequst.GetIP,
                      }),
                      'utf-8',
                    );
                  }
                }
                break;

              case WifiRequst.SetWIFIData:
                if (
                  !receivedData.ipAddress ||
                  receivedData.ipAddress === 'FAIL'
                ) {
                  Toast.show({
                    title: 'Помилка підключення',
                    status: 'error',
                  });
                  this.setState({
                    ipAddress: null,
                  });
                  connectedDevice.write(
                    JSON.stringify({
                      request: WifiRequst.GetWIFIData,
                    }),
                    'utf-8',
                  );
                  return;
                }

                this.setState({
                  ipAddress: receivedData.ipAddress,
                });

                break;

              case WifiRequst.GetIP:
                if (!receivedData.ip || receivedData.ip === 'NoIP') {
                  Toast.show({
                    title: 'Помилка в отриманні IP адреси',
                    status: 'error',
                  });
                  return;
                }

                this.setState({ ipAddress: receivedData.ip });

                break;

              default:
                break;
            }
          } catch (error) {
            errorToast(error);
          }
        });

        const data = {
          request: WifiRequst.GetWIFIData,
        };

        connectedDevice.write(JSON.stringify(data), 'utf-8');
      } catch (error) {
        errorToast(error);
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    })();
  }

  onConnect = async (wifiFormValues: WifiFormValues) => {
    this.setState({ isLoading: true });

    (async () => {
      try {
        if (!this.props.deviceAddress) {
          Toast.show({
            title: 'Не підключено до мережі',
            status: 'error',
          });
          return;
        }

        const connectedDevice = await RNBluetoothClassic.getConnectedDevice(
          this.props.deviceAddress,
        );

        const data = {
          request: WifiRequst.SetWIFIData,
          network: wifiFormValues.network,
          password: wifiFormValues.password,
        };

        await connectedDevice.write(JSON.stringify(data), 'utf-8');
      } catch (error) {
        errorToast(error);
      } finally {
        this.setState({ isLoading: false });
      }
    })();
  };

  onRefresh = async () => {
    this.setState({
      isLoading: true,
    });

    (async () => {
      try {
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
      } catch (error) {
        errorToast(error);
      } finally {
        this.setState({ isLoading: false });
      }
    })();
  };

  componentWillUnmount() {
    this.readSubscription?.remove();
  }

  render() {
    return (
      <Center mt="10">
        {this.state.isLoading ? (
          <HStack
            style={{
              position: 'absolute',
            }}>
            <Spinner size="lg" />
          </HStack>
        ) : null}
        <VStack width="90%">
          <WifiForm
            onRefresh={this.onRefresh}
            onConnect={this.onConnect}
            networks={this.state.networks}
            initialValues={{ network: this.state.connectedNetwork }}
          />
        </VStack>
        <Text mt="4">IP Address: {this.state.ipAddress}</Text>
      </Center>
    );
  }
}

export default connector(WifiSettings);
