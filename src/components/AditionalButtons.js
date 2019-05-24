import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
   
    Button,
    Text,

   
  } from "native-base";

export default class AditionButtons extends React.Component {
    render() {
        return (
            <View>
                
                    <Button rounded block primary 
                    onPress={this.props.onGetIP}
                    disabled={!this.props.editable}
                    style={styles.mb15}>
                        <Text>Дізнатися IP</Text>
                    </Button>
                    <Button rounded block primary 
                    onPress={this.props.onRefreshWIFI}
                    disabled={!this.props.editable}
                    style={styles.buttons}>
                        <Text>Оновити список</Text>
                    </Button>
                
                    </View>
        )
    }
}
 
const styles = StyleSheet.create({
    buttons: {
        marginTop: 15,
    }
});