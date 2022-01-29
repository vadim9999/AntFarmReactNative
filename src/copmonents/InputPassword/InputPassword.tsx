import { Input, Icon } from 'native-base';
import React, { Component } from 'react';
import { InputPasswordProps, InputPasswordState } from './InputPassword.types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export class InputPassword extends Component<
  InputPasswordProps,
  InputPasswordState
> {
  constructor(props: InputPasswordProps) {
    super(props);

    this.state = {
      show: false,
    };
  }

  onTogglePassword = () => this.setState({ show: !this.state.show });

  render() {
    return (
      <Input
        type={this.state.show ? 'text' : 'password'}
        InputRightElement={
          <>
            {this.state.show ? (
              <Icon
                onPress={this.onTogglePassword}
                as={<MaterialCommunityIcons name="eye-off" />}
                size={5}
                mr="2"
                color="muted.400"
              />
            ) : (
              <Icon
                onPress={this.onTogglePassword}
                as={<MaterialCommunityIcons name="eye" />}
                size={5}
                mr="2"
                color="muted.400"
              />
            )}
          </>
        }
        placeholder="Password"
        {...this.props}
      />
    );
  }
}

export default InputPassword;
