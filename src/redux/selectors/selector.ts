import { RootState } from 'redux/store/store';

export const getDeviceState = (store: RootState) => store.device;

export const getDeviceAddress = (store: RootState) =>
  getDeviceState(store).deviceAddress;
