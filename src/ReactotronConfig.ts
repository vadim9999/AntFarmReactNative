import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

let reactotron;
if (__DEV__) {
  // @ts-ignore
  reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({
      name: 'AntFarm',
    })
    .useReactNative()
    .use(reactotronRedux())
    .connect();
}

export default reactotron;
