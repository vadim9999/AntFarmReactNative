import { Box, Text } from 'native-base';
import React from 'react';
import ScanForm from './components/ScanForm/ScanForm';

export default class BluetoothSettings extends React.Component {
  render() {
    return (
      <>
        <Box>
          <Text>Підключення з фермою відсутнє</Text>
          <Text>Підключено до мурашиної ферми</Text>
        </Box>
        <Box>
          <ScanForm />
        </Box>
        <Box>
          <Text>Інформація</Text>
        </Box>
      </>
    );
  }
}
