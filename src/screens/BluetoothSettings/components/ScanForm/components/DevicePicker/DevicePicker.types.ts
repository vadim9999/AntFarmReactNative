export interface DeviceList {
  name: string;
  address: string;
}

export interface Props {
  devices: DeviceList[];
  deviceAddress: string;
  setBluetoothDevice: (itemValue: string) => void;
}

export interface State {}
