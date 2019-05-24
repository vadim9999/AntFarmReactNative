import {  Alert,  View, ImageBackground} from 'react-native';
import React from 'react';
import styles from './styles'
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Body,
  Text
} from 'native-base';

import image from '../background/86.jpg';

class AboutApplication extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Про додаток',
      
    };
  
    render() {
      return (
        <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Про додаток</Title>
          </Body>

        </Header>
        <ImageBackground source={image} style={styles.imageBackground}>
       <View style={styles.container}>
        <Text>Про додаток</Text>
        
      </View>
      </ImageBackground>
      </Container>
      );
    }
  }

export default AboutApplication