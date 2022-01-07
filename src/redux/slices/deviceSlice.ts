import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeviceState {
  deviceAddress: string | null;
}

const initialState: DeviceState = {
  deviceAddress: null,
};

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDeviceAddress: (state, action: PayloadAction<string | null>) => {
      state.deviceAddress = action.payload;
    },
  },
});

export const { setDeviceAddress } = deviceSlice.actions;

export default deviceSlice.reducer;
