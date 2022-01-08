import { connect, ConnectedProps } from 'react-redux';
import { getDeviceAddress } from 'redux/selectors/selector';
import { setDeviceAddress } from 'redux/slices/deviceSlice';
import { RootState } from 'redux/store/store';

const mapStateToProps = (state: RootState) => ({
  deviceAddress: getDeviceAddress(state),
});

const mapDispatchToProps = { setDeviceAddress };

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;
