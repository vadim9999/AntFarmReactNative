import EasyBluetooth from 'easy-bluetooth-classic';

config = {
  "uuid":
    "00001101-0000-1000-8000-00805f9b34fb",
  "deviceName": "Samsung",
  "bufferSize": 1024,
  "characterDelimiter": "\n"
}

function getBluetooth() {
  return EasyBluetooth
}
function init() {
  EasyBluetooth.init(this.config)
    .then(function (config) {
      console.log("config done!");
    })
    .catch(function (ex) {
      console.warn(ex);
    });
}

function onStartScan() {
  console.log("Started scanning");

  return EasyBluetooth.startScan()
    .then(function (devices) {
      console.log("all devices found:");
      var obj = {};

      for (var i = 0, len = devices.length; i < len; i++)
        obj[devices[i]['address']] = devices[i];

      var result = new Array();
      for (var address in obj)
        result.push(obj[address]);
      // console.log(result);
      return result
    })
    .catch(function (ex) {
      console.warn(ex);
    });
}

function connectToDevice(device) {
  // var device = this.getDevice()

  return EasyBluetooth.connect(device)
}


function bindListeners(obj) {
  obj.onDeviceFoundEvent = EasyBluetooth.addOnDeviceFoundListener(onDeviceFound.bind(obj));
  // this.onStatusChangeEvent = EasyBluetooth.addOnStatusChangeListener(this.onStatusChange.bind(this));
  // obj.onDataReadEvent = EasyBluetooth.addOnDataReadListener(onDataRead.bind(obj));
  // this.onDeviceNameEvent = EasyBluetooth.addOnDeviceNameListener(this.onDeviceName.bind(this));

}
function onDeviceFound(device) {
  console.log("onDeviceFound");
  console.log(device);
}

function writeToDevice(message) {

  EasyBluetooth.write(message)
    .then(() => {
      console.log("Writing...")
    })
    .catch((ex) => {
      console.warn(ex);
    })
}

function getThis(that) {
  console.log(that);
}

function getArrWithConnNetwork(networks, connectedNetwork) {
  if (connectedNetwork !== "") {
    var index = networks.indexOf(connectedNetwork)
    if (index > 0) {
      var tmp = networks[0]
      networks[0] = networks[index] + " підключено"
      networks[index] = tmp
    } else if (index == 0) {
      networks[0] += " підключено"
    }
  }
  return networks
}

function getObjectForState(receivedData) {
  
  var obj = {
    properties: {

    },
    status: ""
  }
  if (receivedData.request == "getWIFIData") {
    var networks = receivedData["data"];
    var connectedNetwork = receivedData["router"]

    var sortedNetworks = getArrWithConnNetwork(networks, connectedNetwork)

    if (sortedNetworks != undefined && sortedNetworks.length > 0) {
      obj = {
        properties: {
          networks: networks,
          network: networks[0],
          activity: false
        },
         status: "OK"
      }
    }

  }

  if (receivedData.request == "setWIFIData") {

    if (receivedData["ipAddress"] != "FAIL") {
      obj = {
        properties: {
          routerPassword: "",
          visiblePassword: false,
          activity: false,
        },
        status: "OK"
      }
      
    }
    else {
      // Alert.alert('Сталася помилка. Будь ласка перевірте логін та пароль ')
      obj = {
        properties: {
            activity: false
          
        },
        status: "FAIL"
      }
      
    }
    var data = {
      "request": "getWIFIData"
    }
    writeToDevice(JSON.stringify(data))
  }

  return obj

}

export {
  init,
  onStartScan,
  getThis,
  bindListeners,
  connectToDevice,
  writeToDevice,
  getArrWithConnNetwork,
  getObjectForState

}