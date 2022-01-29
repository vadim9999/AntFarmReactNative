import { DeviceList } from './components/DevicePicker/DevicePicker.types';

export interface ScanFormValues {
  deviceAddress: string;
}

export interface Props {
  devices: DeviceList[];
  onConnect: (values: ScanFormValues) => void;
  onRefresh: () => void;
}

export interface State {
  form: ScanFormValues;
}
