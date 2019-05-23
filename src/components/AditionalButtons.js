import React from 'react';
import { StyleSheet, Button, View } from 'react-native';


export default class AditionButtons extends React.Component {
    render(){
        return(
            <View>
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
                    <View style={styles.buttons}>
                <Button
                    style={styles.buttons}
                    onPress={this.props.onRefreshWIFI}
                    title="Оновити список мереж"
                    color="#841584"
                    disabled={!this.props.editable}
                />
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttons: {
      marginTop: 15,
    }
  });