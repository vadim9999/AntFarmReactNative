import React from 'react';
import { View } from 'react-native';
// import { Text } from 'native-base';
// import { writeToDevice } from '../selector/selector';

// import NetworkPicker from './NetworkPicker';

// import styles from './styles';

export default class WIFIForm extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      visiblePassword: false,
      routerPassword: '',
      network: '',
    };

    // this.onDisplayPassword = this.onDisplayPassword.bind(this);
    // this.onChangeValuePassRouter = this.onChangeValuePassRouter.bind(this);
    // this.onSend = this.onSend.bind(this);
    // this.setNetwork = this.setNetwork.bind(this);
  }

  // onDisplayPassword() {
  //   this.setState({
  //     visiblePassword: !this.state.visiblePassword,
  //   });
  // }

  // onSend() {
  //   if (this.state.network.length > 0 && this.state.routerPassword.length > 0) {
  //     const data = {
  //       request: 'setWIFIData',
  //       network: this.state.network,
  //       password: this.state.routerPassword,
  //     };

  //     writeToDevice(JSON.stringify(data));
  //     this.props.onChangeActivity(true);
  //     this.setState({
  //       routerPassword: '',
  //     });
  //   } else {
  //     Alert.alert('Виберіть мережу та введіть пароль');
  //   }
  // }

  // onChangeValuePassRouter(routerPassword) {
  //   this.setState({ routerPassword });
  // }

  // setNetwork(network) {
  //   this.setState({
  //     network,
  //   });
  // }

  render() {
    return (
      <View>
        {/* <Form>
          <Item picker>
            <Text style={styles.text_farm}> Виберіть мережу:</Text>

            <NetworkPicker
              setNetwork={this.setNetwork}
              networks={this.props.networks}
              enabled={this.props.editable}
            />
          </Item>
          <Item>
            <Input
              onChangeText={routerPassword =>
                this.onChangeValuePassRouter(routerPassword)
              }
              secureTextEntry={!this.state.visiblePassword}
              value={this.state.routerPassword}
              editable={this.props.editable}
              placeholder="Введіть пароль мережі"
            />
          </Item>
          <ListItem
            style={styles.checkbox}
            button
            onPress={this.onDisplayPassword}>
            <CheckBox
              color="#000"
              checked={this.state.visiblePassword}
              onPress={this.onDisplayPassword}
              color="green"
            />
            <Body>
              <Text>Показати пароль</Text>
            </Body>
          </ListItem>
        </Form> */}

        {/* <Button
          block
          rounded
          primary
          onPress={this.onSend}
          disabled={!this.props.editable}
          style={styles.mb15}>
          <Text>Зберегти</Text>
        </Button> */}
      </View>
    );
  }
}
