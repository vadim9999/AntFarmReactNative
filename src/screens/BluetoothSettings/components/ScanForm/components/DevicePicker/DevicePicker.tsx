import React from 'react';
import { Select, CheckIcon } from 'native-base';
import { DevicePickerProps, DevicePickerState } from './DevicePicker.types';

export default class DevicePicker extends React.Component<
  DevicePickerProps,
  DevicePickerState
> {
  constructor(props: DevicePickerProps) {
    super(props);
  }

  render() {
    return (
      <Select
        accessibilityLabel="Виберіть ферму"
        placeholder="Виберіть ферму"
        selectedValue={this.props.deviceAddress}
        onValueChange={itemValue => {
          this.props.setBluetoothDevice(itemValue);
        }}
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size={5} />,
        }}>
        {(this.props.devices ?? []).map(device => (
          <Select.Item
            key={device.address}
            label={device.name}
            value={device.address}
          />
        ))}
      </Select>
    );
  }
}
