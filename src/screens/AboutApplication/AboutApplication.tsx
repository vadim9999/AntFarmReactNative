import { View } from 'react-native';
import React from 'react';
import styles from './styles';
import { Container, Text } from 'native-base';

class AboutApplication extends React.Component {
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Text>Про додаток</Text>
        </View>
      </Container>
    );
  }
}

export default AboutApplication;
