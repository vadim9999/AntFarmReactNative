import { PermissionsAndroid } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export const requestAccessFineLocationPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Access fine location required for discovery',
      message:
        'In order to perform discovery, you must enable/allow ' +
        'fine location access.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export const checkBluetooth = async () => {
  let isBluetoothAvailable = await RNBluetoothClassic.isBluetoothAvailable();

  if (!isBluetoothAvailable) {
    throw new Error('Bluetooth is not available on this device');
  }

  let granted = await requestAccessFineLocationPermission();

  if (!granted) {
    throw new Error('Access fine location was not granted');
  }

  let enabled = await RNBluetoothClassic.isBluetoothEnabled();

  if (!enabled) {
    throw new Error('Bluetooth is not enabled! Enable it!');
  }
};
