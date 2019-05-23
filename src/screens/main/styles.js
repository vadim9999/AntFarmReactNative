import { StyleSheet, Alert, Text, View, ImageBackground, Button, TextInput, CheckBox } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        width: '100%',
        height: '100%'
    },
    buttons: {
        marginTop: 15,
    },
    scan_block: {
        flex: 1,
        height: 50,
        justifyContent: "center"
    },
    wifi_form: {
        flex: 2
    },
    textInput: {
        height: 40,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        margin: 12,
        color: '#8b2d77'
    },
    content: {
        flex: 1,
        margin: '4%'
    }
});

export default styles