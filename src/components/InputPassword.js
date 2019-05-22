import React from 'react';
import { StyleSheet, Alert, Text, View, ImageBackground, Button, TextInput, CheckBox } from 'react-native';
import styles from "../screens/main/styles.js"

export default class InputPassword extends React.Component {
    render(){
        return(
             <TextInput
                    style={styles.textInput}
                    onChangeText={(routerPassword) => this.props.onChangeValuePassRouter(routerPassword)}
                    secureTextEntry={!this.props.visiblePassword}
                    value={this.props.routerPassword}
                    editable={this.props.editable}
                    placeholder="Введіть пароль роутера"
                    placeholderTextColor="black"
                  />
        )
    }
}
