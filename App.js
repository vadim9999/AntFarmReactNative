import React from 'react';
import { StyleSheet, Alert, Text, View, ImageBackground, Button, AppRegistry, TextInput, CheckBox, Picker } from 'react-native';
import EasyBluetooth from 'easy-bluetooth-classic';
import Scan from "./components/Scan"
import { init, onStartScan, writeToDevice } from "./selector/selector"
import KeyboardShift from './components/KeyboardShift';
import NetworkPicker from './components/NetworkPicker';
import Loader from './components/Loader';
import image from "./background/83.png"
// import whyDidYouUpdate from "why-did-you-update";
// import whyDidYouUpdate from "rn-why-did-you-update";

// whyDidYouUpdate(React);
// whyDidYouUpdate(React);
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // device: [],
      // devices: [],
      network: "",
      routerPassword: "",
      visiblePassword: false,
      editable: false,
      networks: "",
      activity: false
      // editable: true,
    }

    this.onSend = this.onSend.bind(this)
    // this.getDevice = this.getDevice.bind(this)
    this.enableEditing = this.enableEditing.bind(this)
    this.getNetwork = this.getNetwork.bind(this)
    this.onGetIP = this.onGetIP.bind(this)
    this.onChangeActivity = this.onChangeActivity.bind(this)
    this.onRefreshWIFI = this.onRefreshWIFI.bind(this)
    // this.onStartScan = this.onStartScan.bind(this)
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

  // getDevice(device) {
  //   console.log(device);
  // }

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
    // var receivedData = {"name": "getWIFIData", "router":"router","data":["wirys","router","smart"]}



    if (receivedData.request == "getWIFIData") {
      var networks = receivedData["data"];
      if (receivedData["router"] != "") {
        var index = networks.indexOf(receivedData["router"])
        console.log("index");
        console.log(index);


        if (index != -1) {
          var tmp = networks[0]
          networks[0] = networks[index] + " підключено"
          networks[index] = tmp
        }
      }
      this.setState({
        networks: networks,
        activity: false
      })
    }
    if (receivedData.request == "setWIFIData") {
      // @ToDo if connected ok or fail
      console.log(receivedData["ipAddress"]);
      if (receivedData["ipAddress"] != "FAIL") {
        
        this.setState({
          network: "",
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
    }

    if (receivedData.request == "getIP") {
      if (receivedData["ip"] != undefined & receivedData["ip"] != "NoIP") {
        Alert.alert(receivedData["ip"])
      } else {
        Alert.alert("Помилка перевірте підключення")
      }

    }
    // if ("OK" == data) {
    //   console.log("Data is received");
    // }
    console.log(data);
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
    console.log("activity");
    // console.log(this.state.activity);
    {/* <View style={{right:'50%', top:'50%', position:'absolute'}}>
        {/* <ActivityIndicator animating={this.state.activity} size="large" color="#0000ff" /> */}

    /* </View>  */

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

                  <Text>Виберіть wifi мережу</Text>
                  <NetworkPicker getNetwork={this.getNetwork}
                    networks={this.state.networks}
                    enabled={this.state.editable}
                  />
                  {/* <TextInput

                    style={styles.textInput}
                    onChangeText={(routerName) => this.setState({ routerName })}
                    value={this.state.routerName}
                    editable={this.state.editable}
                    placeholder="Введіть ім'я роутера"
                    placeholderTextColor="black"
                  /> */}
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
    // backgroundColor: '#F0F2F0',

    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  buttons: {
    // flex:3,
    // backgroundColor: 'steelblue',
    marginTop: 15,
    
    // color: 'green',
  },
  scan_block: {
    flex: 1,
    // justifyContent: "flex-start",
    height: 50,
    // backgroundColor: 'skyblue', 
    justifyContent: "center"
  },
  wifi_form: {
    flex: 2
    // flexDirection: 'column',
    // justifyContent:'center'
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
  // button: {
  //   margin:12
  // }
});
