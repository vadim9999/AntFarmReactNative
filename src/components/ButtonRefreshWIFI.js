import React from 'react';
import { StyleSheet, Alert, Text, View, ImageBackground, Button, TextInput, CheckBox } from 'react-native';


export default class ButtonRefreshWIFI extends React.Component {
    render() {
        return (
            <View style={styles.buttons}>
                <Button
                    style={styles.buttons}
                    onPress={this.props.onRefreshWIFI}
                    title="Оновити список мереж"
                    color="#841584"
                    disabled={!this.props.editable}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttons: {
      marginTop: 15,
    }
  });