import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  Text,
  Toast,
  VStack,
} from 'native-base';
import React from 'react';
import ScanForm from './components/ScanForm/ScanForm';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { ScanFormValues } from './components/ScanForm/ScanForm.types';
import { BluetoothSettingsProps, State } from './BluetoothSettings.types';
import { checkBluetooth } from './helper';
import { connector } from './connector';
import { errorToast } from 'utils/errorToast';
import Spinner from 'copmonents/Spinner/Spinner';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class BluetoothSettings extends React.Component<BluetoothSettingsProps, State> {
  constructor(props: BluetoothSettingsProps) {
    super(props);

    this.state = {
      isLoading: false,
      devices: [],
    };
  }

  async componentDidMount() {
    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({ isLoading: true });

    (async () => {
      try {
        await checkBluetooth();

        const devices = await RNBluetoothClassic.startDiscovery();

        this.setState({
          devices,
        });
      } catch (error) {
        errorToast(error);
      } finally {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ isLoading: false });
      }
    })();
  }

  onConnect = async (formValues: ScanFormValues) => {
    this.setState({ isLoading: true });

    (async () => {
      try {
        const foundedDevice = this.state.devices.find(
          device => device.address === formValues.deviceAddress,
        );

        if (!foundedDevice) {
          throw new Error('Не підключено до мурашиної ферми');
        }

        const isConnectedToAntFarm = await foundedDevice.connect({
          connectorType: 'rfcomm',
          delimiter: '\n',
          charset: 'utf-8',
        });

        if (!isConnectedToAntFarm) {
          throw new Error('Помилка в підключенні');
        }

        this.props.setDeviceAddress(foundedDevice.address);
        Toast.show({
          title: 'Успішно підключено',
          status: 'success',
        });
      } catch (error) {
        errorToast(error);
      } finally {
        this.setState({ isLoading: false });
      }
    })();
  };

  onScan = async () => {
    this.setState({
      isLoading: true,
    });
    (async () => {
      try {
        await checkBluetooth();

        const devices = await RNBluetoothClassic.startDiscovery();

        this.setState({
          devices,
        });
      } catch (error) {
        errorToast(error);
      } finally {
        this.setState({ isLoading: false });
      }
    })();
  };

  render() {
    const deviceList = this.state.devices.map(device => ({
      name: device.name,
      address: device.address,
    }));

    return (
      <>
        {this.state.isLoading ? <Spinner /> : null}
        <Center mt="10">
          <HStack width="90%">
            {this.props.deviceAddress ? (
              <Box style={styles.messageBoxSuccess}>
                <Flex direction="row" alignItems="center">
                  <Icon
                    color="green.500"
                    size="8"
                    as={<MaterialCommunityIcons name="check" />}
                  />
                  <Text>Підключено до мурашиної ферми</Text>
                </Flex>
              </Box>
            ) : (
              <Box style={styles.messageBoxError}>
                <Flex direction="row" alignItems="center">
                  <Icon
                    color="red.500"
                    size="8"
                    as={<MaterialCommunityIcons name="alert-circle" />}
                  />
                  <Text>Підключення з мурашиною фермою відсутнє</Text>
                </Flex>
              </Box>
            )}
          </HStack>

          <VStack mt="4" width="90%">
            <ScanForm
              onRefresh={this.onScan}
              onConnect={this.onConnect}
              devices={deviceList}
            />
          </VStack>
        </Center>
      </>
    );
  }
}

export default connector(BluetoothSettings);
