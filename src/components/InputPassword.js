import React from 'react';
import { StyleSheet, Alert, Text, View, ImageBackground, Button, TextInput, CheckBox } from 'react-native';
import styles from "../screens/main/styles.js"

export default class InputPassword extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visiblePassword: false
        }
        this.onDisplayPassword = this.onDisplayPassword.bind(this)
    }

    onDisplayPassword(){
        this.setState({
          visiblePassword: !this.state.visiblePassword
      })
      }

    render(){
        return(
            <View>
             <TextInput
                    style={styles.textInput}
                    onChangeText={(routerPassword) => this.props.onChangeValuePassRouter(routerPassword)}
                    secureTextEntry={!this.state.visiblePassword}
                    value={this.props.routerPassword}
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
            </View>
        )
    }
}
