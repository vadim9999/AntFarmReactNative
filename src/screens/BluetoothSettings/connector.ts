import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'redux/store/store';
import { setDeviceAddress } from 'redux/slices/deviceSlice';

const mapStateToProps = (state: RootState) => ({
  isBluetoothAvailable: state.device.isBluetoothAvailable,
});

const mapDispathcToProps = {
  setDeviceAddress,
};

export const connector = connect(mapStateToProps, mapDispathcToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;
