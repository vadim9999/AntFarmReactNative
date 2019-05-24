import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    mb15: {
        marginBottom: 20,
    },
    checkbox: {
        borderColor: 'transparent'
    },
    // Scan
    scan_form: {
        marginBottom: 5
    },
    spinner: {
        marginLeft: 5
    },
    button_block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    scan_block: {
        paddingTop: '8%',
        flex: 1,
        height: 50,
        justifyContent: 'center',

    },
    network_picker:
        { height: 50, width: '100%' },

});

export default styles;