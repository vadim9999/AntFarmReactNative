// import EasyBluetooth from 'easy-bluetooth-classic';

interface Config {
  uuid: string;
  deviceName: string;
  bufferSize: number;
  characterDelimiter: string;
}

class BluetoothService {
  private config;

  constructor(config: Config) {
    this.config = config;
  }

  init() {
    BluetoothSerial.on('read', data => {
      console.log('data', data);
    });

    BluetoothSerial.withDelimiter('\n').then(res => {
      console.log('Bluetooth subscribed with delimiter', res);
    });
  }

  getBluetoothDevices() {
    console.log('Started scanning');

    return EasyBluetooth.startScan()
      .then(devices => {
        console.log('all devices found:', devices);
        // var obj = {};

        // for (var i = 0, len = devices.length; i < len; i++)
        //   obj[devices[i]['address']] = devices[i];
        // // TODO so strange logic refactor this
        // var result = new Array();
        // for (var address in obj) result.push(obj[address]);
        // // console.log(result);
        // return result;
      })
      .catch(function (ex) {
        console.warn(ex);
      });
  }
  //   getWifiNetworks () {

  //   }
}

// TODO maybe it should be specified outside
const config = {
  uuid: '00001101-0000-1000-8000-00805f9b34fb',
  deviceName: 'Samsung',
  bufferSize: 1024,
  characterDelimiter: '\n',
};

export default new BluetoothService(config);
