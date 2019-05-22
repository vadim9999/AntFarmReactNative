import React from 'react';
import { StyleSheet, Alert, Text, View, ImageBackground, Button, TextInput, CheckBox} from 'react-native';
import EasyBluetooth from 'easy-bluetooth-classic';
import Scan from "../../components/Scan"
import { init, writeToDevice } from "../../selector/selector"
import KeyboardShift from '../../components/KeyboardShift';
import NetworkPicker from '../../components/NetworkPicker';
import Loader from '../../components/Loader';
import image from "./background/83.png"

export default class MainScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Головна',
    
  };

  constructor(props) {
    super(props);
    this.state = {
      network: "",
      routerPassword: "",
      visiblePassword: false,
      editable: false,
      networks: "",
      activity: false
    }

    this.onSend = this.onSend.bind(this)
    this.enableEditing = this.enableEditing.bind(this)
    this.getNetwork = this.getNetwork.bind(this)
    this.onGetIP = this.onGetIP.bind(this)
    this.onChangeActivity = this.onChangeActivity.bind(this)
    this.onRefreshWIFI = this.onRefreshWIFI.bind(this)
   
  }

  componentWillMount() {
    init();
    this.onDataReadEvent = EasyBluetooth.addOnDataReadListener(this.onDataRead.bind(this));
  }

  componentWillUnmount() {
    this.onDataReadEvent.remove();
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
  onDataRead(data) {
    console.log("onDataRead");
    var receivedData = JSON.parse(data)
    
    if (receivedData.request == "getWIFIData") {
      var networks = receivedData["data"];

      if (receivedData["router"] !== "") {
        var index = networks.indexOf(receivedData["router"])
        if (index > 0) {
          var tmp = networks[0]
          networks[0] = networks[index] + " підключено"
          networks[index] = tmp
        }else if(index == 0) {
          networks[0] += " підключено"
        }
      }
      
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
      <ImageBackground source={image} style={{width: '100%', height: '100%'}}>
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

                  <Text style={{fontSize:20}}>Виберіть wifi мережу</Text>
                  <NetworkPicker getNetwork={this.getNetwork}
                    networks={this.state.networks}
                    enabled={this.state.editable}
                  />
      
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(routerPassword) => this.setState({ routerPassword })}
                    secureTextEntry={!this.state.visiblePassword}
                    value={this.state.routerPassword}
                    editable={this.state.editable}
                    placeholder="Введіть пароль роутера"
                    placeholderTextColor="black"
                  />

                  <View >
                    <View style={{ flexDirection: 'column' }}>
                      <View style={{ flexDirection: 'row' }}>
                        <CheckBox

                          value={this.state.visiblePassword}
                          disabled={!this.state.editable}
                          onValueChange={() => {
                            this.setState({
                              visiblePassword: !this.state.visiblePassword
                            }
                            )
                          }}
                        />
                        <Text style={{ marginTop: 5 }}> Показати пароль</Text>
                      </View>
                    </View>
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
                    <View style={styles.buttons}>
                    <Button
                      style={styles.buttons}
                      onPress={this.onGetIP}
                      title="Дізнатися IP адресу"
                      color="#841584"
                      accessibilityLabel="Learn more about this purple button"
                      disabled={!this.state.editable}
                    />
                    </View>
                    <View style={styles.buttons}>
                    <Button
                      style={styles.buttons}
                      onPress={this.onRefreshWIFI}
                      title="Оновити список мереж"
                      color="#841584"
                      disabled={!this.state.editable}
                    />
                    </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    marginTop: 15,
  },
  scan_block: {
    flex: 1,
    height: 50,
    justifyContent: "center"
  },
  wifi_form: {
    flex: 2
  },
  textInput: {
    height: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    margin: 12,
    color: 'green'
  },
  content: {
    flex: 1,
    margin: '4%'
  }
});
