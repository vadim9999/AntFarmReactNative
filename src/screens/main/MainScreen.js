import React from 'react';
import { StyleSheet, Alert, Text, View, ImageBackground, Button, TextInput, CheckBox} from 'react-native';
import EasyBluetooth from 'easy-bluetooth-classic';
import Scan from "../../components/Scan"
import { init, writeToDevice, getArrWithConnNetwork } from "../../selector/selector"
import KeyboardShift from '../../components/KeyboardShift';
import NetworkPicker from '../../components/NetworkPicker';

import ButtonGetIP from '../../components/ButtonGetIP';
import ButtonRefreshWIFI from '../../components/ButtonRefreshWIFI';
import InputPassword from '../../components/InputPassword';

import Loader from '../../components/Loader';
import image from "./background/86.jpg"

import styles from "./styles"
export default class MainScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Головна',
    
  };

  constructor(props) {
    super(props);
    this.state = {
      network: "",
      routerPassword: "",
      // editable: false,
      editable: true,
      networks: "",
      activity: false
    }

    this.onSend = this.onSend.bind(this)
    this.enableEditing = this.enableEditing.bind(this)
    this.getNetwork = this.getNetwork.bind(this)
    this.onGetIP = this.onGetIP.bind(this)
    this.onChangeActivity = this.onChangeActivity.bind(this)
    this.onRefreshWIFI = this.onRefreshWIFI.bind(this)
    
    this.onChangeValuePassRouter = this.onChangeValuePassRouter.bind(this)
  }

  componentWillMount() {
    init();
    this.onDataReadEvent = EasyBluetooth.addOnDataReadListener(this.onDataRead.bind(this));
  }

  componentWillUnmount() {
    this.onDataReadEvent.remove();
  }

  onChangeValuePassRouter(routerPassword){
    this.setState({ routerPassword })
  }

  onDisplayPassword(){
    this.setState({
      visiblePassword: !this.state.visiblePassword
  })
  }
  onSend() {
    var data = {
      "request": "setWIFIData",
      "network": this.state.network,
      "password": this.state.routerPassword
    }

    writeToDevice(JSON.stringify(data))
    this.setState({
      activity: true
    })
  }

  onGetIP() {
    var data = {
      "request": "getIP"
    }
    writeToDevice(JSON.stringify(data))
  }

  onChangeActivity(activity) {
    this.setState(
      {
        activity: activity
      }
    )
  }

  onRefreshWIFI() {
    this.setState({
      activity: true
    })
    var data = {
      "request": "getWIFIData"
    }
    writeToDevice(JSON.stringify(data))
  }

  checkRequestOnIP(receivedData){
      if (receivedData["ip"] != undefined & receivedData["ip"] != "NoIP") {
        Alert.alert(receivedData["ip"])     
      } else {
        Alert.alert("Помилка перевірте підключення")
      }
  }

  onDataRead(data) {

    console.log("onDataRead");
    var receivedData = JSON.parse(data)

    if (receivedData.request == "getWIFIData") {
      var networks = receivedData["data"];
      var connectedNetwork = receivedData["router"];
      networks = getArrWithConnNetwork(networks, connectedNetwork)

      if(networks != undefined &&  networks.length > 0){
        this.setState({
          networks: networks,
          network: networks[0],
          activity: false
        })
      }
    }

    if (receivedData.request == "setWIFIData") {

      if (receivedData["ipAddress"] != "FAIL") {
        this.setState({
          routerPassword: "",
          visiblePassword: false,
          activity: false,
        })
      }
      else {
        Alert.alert('Сталася помилка. Будь ласка перевірте логін та пароль ')
        this.setState({
          activity: false
        })
      }
      var data = {
        "request": "getWIFIData"
      }
      writeToDevice(JSON.stringify(data))
    }

    if (receivedData.request == "getIP") {
      if (receivedData["ip"] != undefined & receivedData["ip"] != "NoIP") {
        Alert.alert(receivedData["ip"])
    
      } else {
        Alert.alert("Помилка перевірте підключення")
      }
      }
    }
    
  

  enableEditing() {
    this.setState({
      editable: true,
      activity: true
    })
  }
  getNetwork(network) {
    this.setState({
      network: network
    })
  }
  render() {
    
    return (
      <ImageBackground source={image} style={styles.imageBackground}>
      <View style={styles.container}>

        <Loader
          loading={this.state.activity} onChangeActivity={this.onChangeActivity} />
        <View style={styles.content}>
          <Scan
            enableEditing={this.enableEditing} />

          <View style={styles.wifi_form}>
            <KeyboardShift>
              {() =>
                (<View>

                  <Text style={{fontSize:20, color:'#8b2d77'}}>Виберіть wifi мережу</Text>
                  <NetworkPicker getNetwork={this.getNetwork}
                    networks={this.state.networks}
                    enabled={this.state.editable}
                  />
                  <InputPassword onChangeValuePassRouter = {this.onChangeValuePassRouter} 
                    visiblePassword = {this.state.visiblePassword} 
                    value = {this.state.routerPassword}
                    editable = {this.state.editable} />
                  
                  <View >
                    {/* <DisplayPassword 
                    editable={this.state.editable}
                    onDisplayPassword = {this.onDisplayPassword}/> */}

                    <View style={styles.buttons}>
                    <Button
                      style={styles.buttons}
                      onPress={this.onSend}
                      title="Зберегти"
                      color="#841584"
                      accessibilityLabel="Learn more about this purple button"
                      disabled={!this.state.editable}
                    />
                    </View>

                    <ButtonGetIP onGetIP = {this.onGetIP} editable= {this.state.editable} />
                    <ButtonRefreshWIFI onRefreshWIFI={this.onRefreshWIFI} editable= {this.state.editable}/>
                    
                    </View>
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


