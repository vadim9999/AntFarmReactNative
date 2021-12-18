import React from 'react';
import { Alert, View, ImageBackground } from 'react-native';
import EasyBluetooth from 'easy-bluetooth-classic';
import { Button, Icon, Container, SearchIcon, Box } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
// import Scan from './components/ScanForm/ScanForm';
// import { init, writeToDevice, getArrWithConnNetwork } from 'selector/selector';
// import bluetoothService from 'services/bluetooth-service/bluetooth-service';
// import KeyboardShift from '../../components/KeyboardShift';
// import AditionalButtons from '../../components/AditionalButtons';
// import WIFIForm from '../../components/WIFIForm';

// import Loader from '../../components/Loader';
// import image from '../background/86.jpg';

import styles from './styles';

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      // TODO why is it commented?
      // editable: true,
      networks: '',
      activity: false,
    };

    // this.enableEditing = this.enableEditing.bind(this);
    // this.onGetIP = this.onGetIP.bind(this);
    // this.onChangeActivity = this.onChangeActivity.bind(this);
    // this.onRefreshWIFI = this.onRefreshWIFI.bind(this);
  }

  componentWillMount() {
    // bluetoothService.init().then(() => {
    //   console.log('inited');
    // });
    // init();
    // this.onDataReadEvent = EasyBluetooth.addOnDataReadListener(
    //   this.onDataRead.bind(this),
    // );
  }

  // componentWillUnmount() {
  //   this.onDataReadEvent.remove();
  // }

  // onGetIP() {
  //   const data = {
  //     request: 'getIP',
  //   };
  //   writeToDevice(JSON.stringify(data));
  // }

  // onChangeActivity(activity) {
  //   this.setState({
  //     activity,
  //   });
  // }

  // onRefreshWIFI() {
  //   this.setState({
  //     activity: true,
  //   });
  //   const data = {
  //     request: 'getWIFIData',
  //   };
  //   writeToDevice(JSON.stringify(data));
  // }

  // onDataRead(data) {
  //   console.log('onDataRead');
  //   const receivedData = JSON.parse(data);
  //   switch (receivedData.request) {
  //     case 'getWIFIData':
  //       let networks = receivedData.data;
  //       const connectedNetwork = receivedData.router;
  //       networks = getArrWithConnNetwork(networks, connectedNetwork);

  //       if (networks != undefined && networks.length > 0) {
  //         this.setState({
  //           networks,
  //           network: networks[0],
  //           activity: false,
  //         });
  //       }
  //       break;

  //     case 'setWIFIData':
  //       if (receivedData.ipAddress != 'FAIL') {
  //         this.setState({
  //           activity: false,
  //         });
  //       } else {
  //         Alert.alert('Сталася помилка. Будь ласка перевірте логін та пароль ');
  //         this.setState({
  //           activity: false,
  //         });
  //       }
  //       const request = {
  //         request: 'getWIFIData',
  //       };
  //       writeToDevice(JSON.stringify(request));
  //       break;

  //     case 'getIP':
  //       if ((receivedData.ip != undefined) & (receivedData.ip != 'NoIP')) {
  //         Alert.alert(receivedData.ip);
  //       } else {
  //         Alert.alert('Помилка перевірте підключення');
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  // }

  // enableEditing() {
  //   this.setState({
  //     editable: true,
  //     activity: true,
  //   });
  // }

  render() {
    // TODO split this on blocks or move into another page
    return (
      <Container>
        <Box>Hello</Box>
        {/* <Header> */}
        {/* // <Left> */}
        {/* <Button transparent onPress={() => this.props.navigation.openDrawer()}>
          <Icon name="ios-menu" />
        </Button> */}
        {/* //  </Left>  */}
        {/* // <Body>
          //   <Title>Мурашина ферма</Title>
          // </Body> */}
        {/* </Header> */}
        {/* // <ImageBackground source={image} style={styles.imageBackground}> */}
        {/* <Scan enableEditing={this.enableEditing} /> */}
        {/* <Box>Here</Box> */}

        {/* <Grid>
          <Row size={20} style={styles.scan_row}>
            <Loader
              loading={this.state.activity}
              onChangeActivity={this.onChangeActivity}
            />
          </Row>
          <Row size={80}>
              <KeyboardShift>
                {() => (
                  <View style={styles.wifi_row}>
                    <WIFIForm
                      network={this.state.network}
                      onChangeActivity={this.onChangeActivity}
                      editable={this.state.editable}
                      networks={this.state.networks}
                    />
                    <AditionalButtons
                      onRefreshWIFI={this.onRefreshWIFI}
                      onGetIP={this.onGetIP}
                      editable={this.state.editable}
                    />
                  </View>
                )
                }
              </KeyboardShift>
            </Row>
        </Grid> */}

        {/* </ImageBackground> */}
      </Container>
    );
  }
}

export default MainScreen;
