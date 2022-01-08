import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'redux/store/store';

const mapStateToProps = (state: RootState) => ({
  isBluetoothAvailable: state.device.isBluetoothAvailable,
});

export const connector = connect(mapStateToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;
