import React from 'react';
import { PressableProps } from 'react-native';
import { Button, FormControl } from 'native-base';

import DevicePicker from '../DevicePicker/DevicePicker';

import { Props, State } from './ScanForm.types';

export default class ScanForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      form: { deviceAddress: '' },
    };
  }

  onChange = (fieldName: 'deviceAddress') => (value: string) => {
    this.setState({ form: { ...this.state.form, [fieldName]: value } });
  };

  onSubmit: PressableProps['onPress'] = () => {
    this.props.onConnect({
      deviceAddress: this.state.form.deviceAddress,
    });
  };

  render() {
    return (
      <>
        <FormControl isRequired isInvalid={!this.state.form.deviceAddress}>
          <FormControl.Label _text={{ bold: true }}>
            Виберіть ферму
          </FormControl.Label>
          <DevicePicker
            setBluetoothDevice={this.onChange('deviceAddress')}
            devices={this.props.devices}
            deviceAddress={this.state.form.deviceAddress}
          />
        </FormControl>
        <Button onPress={this.props.onRefresh}>Оновити список</Button>
        <Button
          onPress={this.onSubmit}
          disabled={!this.state.form.deviceAddress}>
          Підключитися
        </Button>
      </>
    );
  }
}
