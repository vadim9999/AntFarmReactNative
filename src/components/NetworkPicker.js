import React from 'react';
import { Picker } from 'native-base';
import uuidv1 from 'uuid/v1';
import styles from './styles';

export default class NetworkPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      network: '',
    };
  }

  getListOfNetworks(networks) {
    if (networks !== undefined && networks.length >= 1) {
      return (
        networks.map((network) => {
          if (network !== undefined) {
            return <Picker.Item key={uuidv1} label={network} value={network} />;
          }
        }));
    }
  }

  render() {
    return (
      <Picker
        enabled={this.props.enabled}
        selectedValue={this.state.network}
        onValueChange={(itemValue, itemIndex) => {
          console.log('Changed values');
          this.setState({ network: itemValue });
          this.props.setNetwork(itemValue);
        }
                }
      >

        {this.getListOfNetworks(this.props.networks)}

      </Picker>
    );
  }
}
