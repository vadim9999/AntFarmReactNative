// import EasyBluetooth from 'easy-bluetooth-classic';

config = {
  uuid: '00001101-0000-1000-8000-00805f9b34fb',
  deviceName: 'Samsung',
  bufferSize: 1024,
  characterDelimiter: '\n',
};
// TODO if it is not using remove it
function getBluetooth() {
  return EasyBluetooth;
}
// TODO create class and hide all this stuff into it
function init() {
  // TODO what is the config ?
  EasyBluetooth.init(this.config)
    .then(function (config) {
      console.log('config done!');
    })
    .catch(function (ex) {
      console.warn(ex);
    });
}

function onStartScan() {
  console.log('Started scanning');

  return EasyBluetooth.startScan()
    .then(function (devices) {
      console.log('all devices found:');
      var obj = {};

      for (var i = 0, len = devices.length; i < len; i++)
        obj[devices[i]['address']] = devices[i];
      // TODO so strange logic refactor this
      var result = new Array();
      for (var address in obj) result.push(obj[address]);
      // console.log(result);
      return result;
    })
    .catch(function (ex) {
      console.warn(ex);
    });
}

function connectToDevice(device) {
  // var device = this.getDevice()

  return EasyBluetooth.connect(device);
}

function bindListeners(obj) {
  obj.onDeviceFoundEvent = EasyBluetooth.addOnDeviceFoundListener(
    onDeviceFound.bind(obj),
  );
  // this.onStatusChangeEvent = EasyBluetooth.addOnStatusChangeListener(this.onStatusChange.bind(this));
  // obj.onDataReadEvent = EasyBluetooth.addOnDataReadListener(onDataRead.bind(obj));
  // this.onDeviceNameEvent = EasyBluetooth.addOnDeviceNameListener(this.onDeviceName.bind(this));
}
function onDeviceFound(device) {
  console.log('onDeviceFound');
  // TODO add notification about success founded devices
  console.log(device);
}

function writeToDevice(message) {
  EasyBluetooth.write(message)
    .then(() => {
      // TODO add notification about success operation
      console.log('Writing...');
    })
    .catch(ex => {
      console.warn(ex);
    });
}

function getThis(that) {
  // TODO looks like bad code
  console.log(that);
}

// TODO change name from conn to connection
function getArrWithConnNetwork(networks, connectedNetwork) {
  if (connectedNetwork !== '') {
    var index = networks.indexOf(connectedNetwork);
    if (index > 0) {
      var tmp = networks[0];
      networks[0] = networks[index] + ' підключено';
      networks[index] = tmp;
    } else if (index == 0) {
      networks[0] += ' підключено';
    }
  }
  return networks;
}

export {
  init,
  onStartScan,
  getThis,
  bindListeners,
  connectToDevice,
  writeToDevice,
  getArrWithConnNetwork,
};
