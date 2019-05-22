import React from 'react';
import { StyleSheet, Alert, Text, View, ImageBackground, Button, TextInput, CheckBox } from 'react-native';


export default class DisplayPassword extends React.Component {
    render() {
        return (
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox

                            value={this.props.visiblePassword}
                            disabled={!this.props.editable}
                            onValueChange={() => {
                                this.props.onDisplayPassword()
                                
                            }}
                        />
                        <Text style={{ marginTop: 5 }}> Показати пароль</Text>
                    </View>
                </View>
                )
            }
}