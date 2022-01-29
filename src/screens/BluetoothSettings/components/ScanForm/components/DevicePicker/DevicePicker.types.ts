export interface DeviceList {
  name: string;
  address: string;
}

export interface DevicePickerProps {
  devices: DeviceList[];
  deviceAddress: string;
  setBluetoothDevice: (itemValue: string) => void;
}

export interface DevicePickerState {}
