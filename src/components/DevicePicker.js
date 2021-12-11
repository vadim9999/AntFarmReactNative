import React from 'react';
import { Select, CheckIcon } from 'native-base';
import uuidv1 from 'uuid/v1';
import styles from './styles';

export default class DevicePicker extends React.Component {
  constructor(props) {
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
    return (
      <Select
        minWidth="200"
        accessibilityLabel="Виберіть ферму"
        placeholder="Виберіть ферму"
        selectedValue={this.state.device}
        onValueChange={itemValue => {
          this.setState({ device: itemValue });
          this.props.getItem(itemValue);
        }}
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size={5} />,
        }}
        mt="1">
        {devices.length
          ? devices.map.map(device => {
              const hasPair = device.uuids.length ? 'Пара' : '';

              return (
                <Select.Item
                  label={`${device.name ?? 'No name'} ${
                    device.address
                  } ${hasPair}`}
                  value="ux"
                />
              );
            })
          : []}
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
