import React from 'react';
import {
  Alert, View, ImageBackground
} from 'react-native';
import EasyBluetooth from 'easy-bluetooth-classic';
import Scan from '../../components/Scan';
import { init, writeToDevice, getArrWithConnNetwork } from '../../selector/selector';
import KeyboardShift from '../../components/KeyboardShift';
import AditionalButtons from '../../components/AditionalButtons';
import WIFIForm from '../../components/WIFIForm';

import Loader from '../../components/Loader';
import image from './background/86.jpg';

import styles from './styles';
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Body
} from 'native-base';
import { Row, Grid } from "react-native-easy-grid";

export default class MainScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Головна',

  };

  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      // editable: true,
      networks: '',
      activity: false,
    };

    this.enableEditing = this.enableEditing.bind(this);
    this.onGetIP = this.onGetIP.bind(this);
    this.onChangeActivity = this.onChangeActivity.bind(this);
    this.onRefreshWIFI = this.onRefreshWIFI.bind(this);
  }

  componentWillMount() {
    init();
    this.onDataReadEvent = EasyBluetooth.addOnDataReadListener(this.onDataRead.bind(this));
  }

  componentWillUnmount() {
    this.onDataReadEvent.remove();
  }

  onGetIP() {
    const data = {
      request: 'getIP',
    };
    writeToDevice(JSON.stringify(data));
  }

  onChangeActivity(activity) {
    this.setState(
      {
        activity,
      },
    );
  }

  onRefreshWIFI() {
    this.setState({
      activity: true,
    });
    const data = {
      request: 'getWIFIData',
    };
    writeToDevice(JSON.stringify(data));
  }

  onDataRead(data) {
    console.log('onDataRead');
    const receivedData = JSON.parse(data);
    switch (receivedData.request) {
      case 'getWIFIData':
        var networks = receivedData.data;
        var connectedNetwork = receivedData.router;
        networks = getArrWithConnNetwork(networks, connectedNetwork);

        if (networks != undefined && networks.length > 0) {
          this.setState({
            networks,
            network: networks[0],
            activity: false,
          });
        }
        break;

      case 'setWIFIData':
        if (receivedData.ipAddress != 'FAIL') {
          this.setState({
            activity: false,
          });
        } else {
          Alert.alert('Сталася помилка. Будь ласка перевірте логін та пароль ');
          this.setState({
            activity: false,
          });
        }
        var data = {
          request: 'getWIFIData',
        };
        writeToDevice(JSON.stringify(data));
        break;

      case 'getIP':
        if (receivedData.ip != undefined & receivedData.ip != 'NoIP') {
          Alert.alert(receivedData.ip);
        } else {
          Alert.alert('Помилка перевірте підключення');
        }
        break;

      default:
        break;
    }
  }

  enableEditing() {
    this.setState({
      editable: true,
      activity: true,
    });
  }

  render() {
    return (

      <Container >
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
            <Title>Мурашина ферма</Title>
          </Body>

        </Header>
        <ImageBackground source={image} style={styles.imageBackground}>

          <Grid>
            <Row size={20} style={{ padding: 20 }}>

              <Loader
                loading={this.state.activity}
                onChangeActivity={this.onChangeActivity}
              />
              <Scan
                enableEditing={this.enableEditing}
              />

            </Row>
            <Row size={80}>
              <KeyboardShift>
                {() => (
                  <View style={{ padding: 20 }}>
                    <WIFIForm
                      network={this.state.network}
                      onChangeActivity={this.onChangeActivity}
                      editable={this.state.editable}
                      networks={this.state.networks}
                    />
                    <AditionalButtons onRefreshWIFI={this.onRefreshWIFI}
                      onGetIP={this.onGetIP}
                      editable={this.state.editable} />
                  </View>
                )
                }
              </KeyboardShift>
            </Row>
          </Grid>
        </ImageBackground>
      </Container>
    );
  }
}
