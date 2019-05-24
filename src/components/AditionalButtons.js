import React from 'react';
import { View } from 'react-native';
import {
  Button,
  Text,
} from 'native-base';
import styles from './styles';

export default class AditionalButtons extends React.Component {
  render() {
    return (
      <View>

        <Button
          rounded
          block
          primary
          onPress={this.props.onGetIP}
          disabled={!this.props.editable}
          style={styles.mb15}
        >
          <Text>Дізнатися IP</Text>
        </Button>
        <Button
          rounded
          block
          primary
          onPress={this.props.onRefreshWIFI}
          disabled={!this.props.editable}

        >
          <Text>Оновити список</Text>
        </Button>

      </View>
    );
  }
}
