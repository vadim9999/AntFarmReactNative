import { Button, CheckIcon, FormControl, Input, Select } from 'native-base';
import React, { Component } from 'react';
import { WifiFormProps, WifiFormState } from './WifiForm.types';

export class WifiForm extends Component<WifiFormProps, WifiFormState> {
  constructor(props: WifiFormProps) {
    super(props);

    this.state = {
      network: null,
      password: null,
    };
  }

  onSubmit = () => {
    // TODO  !this.state.network && !this.state.password - not working
    if (!this.state.network) {
      return;
    }
    if (!this.state.password) {
      return;
    }

    this.props.onConnect({
      network: this.state.network,
      password: this.state.password,
    });
  };

  render() {
    const networkList = this.props.networks.map(network => ({
      label: network,
      value: network,
    }));

    return (
      <>
        <FormControl isInvalid={!this.state.network}>
          <FormControl.Label isRequired _text={{ bold: true }}>
            Виберіть точку доступу WIFI
          </FormControl.Label>
          <Select
            // minWidth="100"
            // maxWidth="200"
            accessibilityLabel="Виберіть WIFI"
            placeholder="Network1"
            // selectedValue={this.props.deviceAddress}
            // TODO move into class fanction
            // onValueChange={itemValue => {
            //   this.props.setBluetoothDevice(itemValue);
            // }}
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size={5} />,
            }}>
            {networkList.map(device => (
              <Select.Item
                key={device.value}
                label={device.label}
                value={device.value}
              />
            ))}
          </Select>
        </FormControl>
        <FormControl isInvalid={!this.state.password}>
          <FormControl.Label>Введіть пароль від WIFI</FormControl.Label>
          <Input type="password" />
        </FormControl>
        <Button>Оновити список</Button>
        <Button onPress={this.onSubmit}>Підключитися</Button>
      </>
    );
  }
}

export default WifiForm;
