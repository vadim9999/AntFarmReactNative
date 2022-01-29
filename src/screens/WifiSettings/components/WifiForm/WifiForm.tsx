import InputPassword from 'copmonents/InputPassword/InputPassword';
import { Button, CheckIcon, FormControl, Select } from 'native-base';
import React, { Component } from 'react';
import { WifiFormProps, WifiFormState } from './WifiForm.types';

export class WifiForm extends Component<WifiFormProps, WifiFormState> {
  constructor(props: WifiFormProps) {
    super(props);

    this.state = {
      network: props.initialValues.network,
      password: null,
    };
  }

  componentDidUpdate(prevProps: WifiFormProps) {
    if (prevProps.initialValues.network !== this.props.initialValues.network) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ network: this.props.initialValues.network });
    }
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

    this.setState({ password: null });
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
            accessibilityLabel="Виберіть WIFI"
            selectedValue={this.state.network ?? undefined}
            onValueChange={itemValue => {
              this.setState({ network: itemValue });
            }}
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
        <FormControl mt="2" isInvalid={!this.state.password}>
          <FormControl.Label isRequired>
            Введіть пароль від WIFI
          </FormControl.Label>
          <InputPassword
            value={this.state.password ?? undefined}
            onChangeText={value => this.setState({ password: value })}
          />
        </FormControl>
        <Button mt="4" onPress={this.props.onRefresh}>
          Оновити список
        </Button>
        <Button mt="2" onPress={this.onSubmit}>
          Підключитися
        </Button>
      </>
    );
  }
}

export default WifiForm;
