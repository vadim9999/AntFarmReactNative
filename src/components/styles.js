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
    // network picker
    network_picker:
        { height: 50, width: '100%' },
    // Loader
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
      },
      activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
    //   keyboard shift
    containerKeyBoardShift: {
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%'
      },
    //   device picker
    device_picker: { height: 50, width: 100 },
    //   aditional buttons
    buttons: {
        marginTop: 15,
    }
});

export default styles;