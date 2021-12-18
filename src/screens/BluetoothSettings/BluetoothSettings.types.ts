import { BluetoothDevice } from 'react-native-bluetooth-classic';

export interface Props {}

export interface State {
  isLoading: boolean;
  devices: BluetoothDevice[];
}
