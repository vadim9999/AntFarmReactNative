import { connect, ConnectedProps } from 'react-redux';
import { getDeviceAddress } from 'redux/selectors/selector';
import { setDeviceAddress } from 'redux/slices/deviceSlice';
import { RootState } from 'redux/store/store';

const mapDispathcToProps = {
  setDeviceAddress,
};

const mapStateToProps = (state: RootState) => ({
  deviceAddress: getDeviceAddress(state),
});

export const connector = connect(mapStateToProps, mapDispathcToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;
