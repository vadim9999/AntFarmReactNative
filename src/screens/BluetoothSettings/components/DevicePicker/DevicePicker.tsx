import React from 'react';
import { Select, CheckIcon } from 'native-base';
import { Props, State } from './DevicePicker.types';
// import styles from '../../../../components/styles';

export default class DevicePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { devices } = this.props;

    const deviceList = devices?.length
      ? devices.map(device => {
          // const hasPair = device.uuids.length ? 'Пара' : '';
          // TODO fix this
          const hasPair = false;

          return {
            label: `${device.name} ${device.address}${hasPair ? ' Pair' : ''}`,
            address: device.address,
          };
        })
      : [];

    return (
      <Select
        // minWidth="100"
        // maxWidth="200"
        accessibilityLabel="Виберіть ферму"
        placeholder="Виберіть ферму"
        selectedValue={this.props.deviceAddress}
        // TODO move into class fanction
        onValueChange={itemValue => {
          this.props.setBluetoothDevice(itemValue);
        }}
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size={5} />,
        }}>
        {deviceList.map(device => (
          <Select.Item
            key={device.address}
            label={device.label}
            value={device.address}
          />
        ))}
      </Select>
      // <Picker
      //   selectedValue={this.state.device}
      //   onValueChange={(itemValue, itemIndex) => {
      //     this.setState({device: itemValue});
      //     this.props.getItem(itemValue);
      //   }}>
      //   {this.getListOfDevices(devices)}
      // </Picker>
    );
  }
}
