import React from 'react';
import { StyleSheet, Alert, Text, View, ImageBackground, Button, TextInput, CheckBox } from 'react-native';


export default class ButtonGetIP extends React.Component {
    render(){
        return(
             <View style={styles.buttons}>
                    <Button
                      style={styles.buttons}
                      onPress={this.props.onGetIP}
                      title="Дізнатися IP адресу"
                      color="#841584"
                      accessibilityLabel="Learn more about this purple button"
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