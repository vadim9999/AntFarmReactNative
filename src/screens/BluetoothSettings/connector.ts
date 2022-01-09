import { connect, ConnectedProps } from 'react-redux';
import { setDeviceAddress } from 'redux/slices/deviceSlice';

const mapDispathcToProps = {
  setDeviceAddress,
};

export const connector = connect(null, mapDispathcToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;
