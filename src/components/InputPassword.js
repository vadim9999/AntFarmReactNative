import React from 'react';
import { StyleSheet, Alert, View, ImageBackground, TextInput, CheckBox } from 'react-native';
import { writeToDevice } from "../selector/selector"
import styles from "../screens/main/styles.js"
import {
   
    Button,
    Text
   
  } from "native-base";

export default class InputPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visiblePassword: false,
            routerPassword: "",
        }

        this.onDisplayPassword = this.onDisplayPassword.bind(this)
        this.onChangeValuePassRouter = this.onChangeValuePassRouter.bind(this)
        this.onSend = this.onSend.bind(this)
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
            routerPassword:''
        })
      }

    onChangeValuePassRouter(routerPassword) {
    this.setState({ routerPassword })
  }
    render() {
        return (
            <View>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(routerPassword) => this.onChangeValuePassRouter(routerPassword)}
                    secureTextEntry={!this.state.visiblePassword}
                    value={this.state.routerPassword}
                    editable={this.props.editable}
                    placeholder="Введіть пароль роутера"
                    placeholderTextColor="black"
                />

                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox

                            value={this.state.visiblePassword}
                            disabled={!this.props.editable}
                            onValueChange={this.onDisplayPassword}
                        />
                        <Text style={{ marginTop: 5 }}> Показати пароль</Text>
                    </View>
                </View>
                <View >
                <Button block rounded primary 
                onPress={this.onSend}
                        
                disabled={!this.props.editable}                
                 style={styles.mb15}>
            <Text>Зберегти</Text>
          </Button>
          
                </View>
            </View>

        )
    }
}
