import React from 'react';
import { StyleSheet, Alert, View, ImageBackground, TextInput } from 'react-native';
import { writeToDevice } from "../selector/selector"
import styles from "../screens/main/styles.js"
import NetworkPicker from './NetworkPicker';
import {

    Button,
    Text,
    Input,
    Form,
    Item,
    CheckBox,
    Body,
    ListItem,
    Picker,
    Row

} from "native-base";

export default class InputPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visiblePassword: false,
            routerPassword: "",
            network: '',
            
        }

        this.onDisplayPassword = this.onDisplayPassword.bind(this)
        this.onChangeValuePassRouter = this.onChangeValuePassRouter.bind(this)
        this.onSend = this.onSend.bind(this)
        this.setNetwork = this.setNetwork.bind(this);
    }

    onDisplayPassword() {
        this.setState({
            visiblePassword: !this.state.visiblePassword
        })
    }

    onSend() {
        console.log(this.state.routerPassword);

        var data = {
            "request": "setWIFIData",
            "network": this.props.network,
            "password": this.state.routerPassword
        }

        writeToDevice(JSON.stringify(data))
        this.props.onChangeActivity(true)
        this.setState({
            routerPassword: ''
        })
    }

    onChangeValuePassRouter(routerPassword) {
        this.setState({ routerPassword })
    }

    setNetwork(network) {
        this.setState({
          network,
        });
      }
    
    render() {
        return (
            <View>
                <Form>
                    <Item>

                        <Text> Виберіть мережу:</Text>

                        <NetworkPicker
                      setNetwork={this.setNetwork}
                      networks={this.props.networks}
                      enabled={this.props.editable}
                    />
                        
                    </Item>
                    <Item>
                        <Input 
                        onChangeText={(routerPassword) => this.onChangeValuePassRouter(routerPassword)}
                        secureTextEntry={!this.state.visiblePassword}
                        value={this.state.routerPassword}
                        editable={this.props.editable}
                        placeholder="Введіть пароль мережі" />
                    </Item>
                    <ListItem style={{ borderColor: 'transparent' }} button onPress={this.onDisplayPassword}>
                        <CheckBox
                            color="#000"
                            checked={this.state.visiblePassword}
                            onPress={this.onDisplayPassword}
                            color="green"
                            disabled={!this.props.editable}
                        />
                        <Body>
                            <Text>Показати пароль</Text>
                        </Body>
                    </ListItem>
                </Form>


                <Button block rounded primary
                    onPress={this.onSend}

                    disabled={!this.props.editable}
                    style={styles.mb15}>
                    <Text>Зберегти</Text>
                </Button>
            </View>


        )
    }
}
