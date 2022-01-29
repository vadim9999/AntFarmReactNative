import { BluetoothDevice } from 'react-native-bluetooth-classic';
import { PropsFromRedux } from './connector';

export interface BluetoothSettingsProps extends PropsFromRedux {}

export interface State {
  isLoading: boolean;
  devices: BluetoothDevice[];
}
