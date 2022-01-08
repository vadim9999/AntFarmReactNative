import { connect, ConnectedProps } from 'react-redux';
import { setIsBluetoothAvailable } from 'redux/slices/deviceSlice';

const mapDispatchToProps = { setIsBluetoothAvailable };

export const connector = connect(null, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;
