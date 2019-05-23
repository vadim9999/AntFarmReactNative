import React from 'react';
import {
   Alert, Text, View, ImageBackground
} from 'react-native';
import EasyBluetooth from 'easy-bluetooth-classic';
import Scan from '../../components/Scan';
import { init, writeToDevice, getArrWithConnNetwork } from '../../selector/selector';
import KeyboardShift from '../../components/KeyboardShift';
import NetworkPicker from '../../components/NetworkPicker';


import AditionalButtons from '../../components/AditionalButtons';
import InputPassword from '../../components/InputPassword';

import Loader from '../../components/Loader';
import image from './background/86.jpg';

import styles from './styles';

export default class MainScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Головна',

  };

  constructor(props) {
    super(props);
    this.state = {
      network: '',
      routerPassword: '',
      // editable: false,
      editable: true,
      networks: '',
      activity: false,
    };

    this.enableEditing = this.enableEditing.bind(this);
    this.setNetwork = this.setNetwork.bind(this);
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

  setNetwork(network) {
    this.setState({
      network,
    });
  }

  render() {
    return (
      <ImageBackground source={image} style={styles.imageBackground}>
        <View style={styles.container}>

          <Loader
            loading={this.state.activity}
            onChangeActivity={this.onChangeActivity}
          />
          <View style={styles.content}>
            <Scan
              enableEditing={this.enableEditing}
            />

            <View style={styles.wifi_form}>
              <KeyboardShift>
                {() => (
                  <View>

                    <Text style={{ fontSize: 20, color: '#8b2d77' }}>Виберіть wifi мережу</Text>
                    <NetworkPicker
                      setNetwork={this.setNetwork}
                      networks={this.state.networks}
                      enabled={this.state.editable}
                    />
                    <InputPassword
                      network={this.state.network}
                      onChangeActivity={this.onChangeActivity}
                      editable={this.state.editable}
                    />

                    <AditionalButtons onRefreshWIFI={this.onRefreshWIFI} 
                    onGetIP={this.onGetIP} 
                    editable={this.state.editable} />
                    

                  </View>
                )
                }
              </KeyboardShift>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
