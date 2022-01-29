import { PermissionsAndroid } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export const requestAccessFineLocationPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Для використання додатку потрібен дозвіл на місцезнаходження',
      message:
        'Для використання додатку потрібен дозвіл на місцезнаходження. Для надання доступу потрібно перейти в налаштування',
      buttonNeutral: 'Запитати пізніше',
      buttonNegative: 'Відмінити',
      buttonPositive: 'OK',
    },
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export const checkBluetooth = async () => {
  let isBluetoothAvailable = await RNBluetoothClassic.isBluetoothAvailable();

  if (!isBluetoothAvailable) {
    throw new Error('Bluetooth не доступний на цьому пристрої');
  }

  let granted = await requestAccessFineLocationPermission();

  if (!granted) {
    throw new Error('Не наданий дозвіл на місцезнаходження');
  }

  let enabled = await RNBluetoothClassic.isBluetoothEnabled();

  if (!enabled) {
    throw new Error('Bluetooth не ввімкнено! Увімкніть його!');
  }
};
