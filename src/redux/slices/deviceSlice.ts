import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeviceState {
  deviceAddress: string | null;
  isBluetoothAvailable: boolean;
}

const initialState: DeviceState = {
  deviceAddress: null,
  isBluetoothAvailable: false,
};

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDeviceAddress: (state, action: PayloadAction<string | null>) => {
      state.deviceAddress = action.payload;
    },
    setIsBluetoothAvailable: (state, action: PayloadAction<boolean>) => {
      state.isBluetoothAvailable = action.payload;
    },
  },
});

export const { setDeviceAddress, setIsBluetoothAvailable } =
  deviceSlice.actions;

export default deviceSlice.reducer;
