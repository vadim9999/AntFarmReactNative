import React from 'react';
import { Select, CheckIcon } from 'native-base';
import { BluetoothDevice } from 'react-native-bluetooth-classic';
// import uuidv1 from 'uuid/v1';
// import styles from '../../../../components/styles';
interface Props {
  devices: BluetoothDevice[];
  setBluetoothDevice: (itemValue: string) => void;
}

interface State {
  device: string;
}

export default class DevicePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      device: '',
    };
  }

  // TODO mayber it can be removed
  // getListOfDevices(devices) {
  //   if (devices?.length) {
  //     const deviceList = devices.map((device) => {
  //       let pair = '';
  //       if (device.uuids.length) {
  //         pair = 'Пара';
  //       }
  //       if (device !== undefined && device.name != undefined)
  //         return (
  //           <Picker.Item
  //             key={uuidv1()}
  //             label={`${device.name} ${device.address} ${pair}`}
  //             value={device.address}
  //           />
  //         );
  //       if (device !== undefined && device.address != undefined) {
  //         return (
  //           <Picker.Item
  //             key={uuidv1()}
  //             label={`${'NoName '}${device.address}`}
  //             value={device.address}
  //           />
  //         );
  //       }
  //       return <Picker.Item key={uuidv1()} label="" value="" />;
  //     });

  //     return deviceList;
  //   }
  // }

  render() {
    const { devices } = this.props;
    console.log('devices', devices);

    const deviceList = devices?.length
      ? devices.map(device => {
          // const hasPair = device.uuids.length ? 'Пара' : '';
          // TODO fix this
          const hasPair = false;

          return {
            label: `${device.name} ${device.address}${hasPair ? ' Pair' : ''}`,
            address: device.address,
          };
        })
      : [];

    return (
      <Select
        // minWidth="100"
        // maxWidth="200"
        accessibilityLabel="Виберіть ферму"
        placeholder="Виберіть ферму"
        selectedValue={this.state.device}
        // TODO move into class fanction
        onValueChange={itemValue => {
          this.setState({ device: itemValue });
          this.props.setBluetoothDevice(itemValue);
        }}
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size={5} />,
        }}
        mt="1">
        {deviceList.map(device => (
          <Select.Item
            key={device.address}
            label={device.label}
            value={device.address}
          />
        ))}
      </Select>
      // <Picker
      //   selectedValue={this.state.device}
      //   onValueChange={(itemValue, itemIndex) => {
      //     this.setState({device: itemValue});
      //     this.props.getItem(itemValue);
      //   }}>
      //   {this.getListOfDevices(devices)}
      // </Picker>
    );
  }
}
