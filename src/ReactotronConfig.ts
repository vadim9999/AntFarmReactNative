import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

let reactotron;
if (__DEV__) {
  reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({
      name: 'AppName',
    })
    .useReactNative() // add all built-in react native plugins
    .use(reactotronRedux())
    .connect(); // let's connect!
}

export default reactotron;

// Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
//   .configure() // controls connection & communication settings
//   .useReactNative() // add all built-in react native plugins
//   .connect(); // let's connect!
