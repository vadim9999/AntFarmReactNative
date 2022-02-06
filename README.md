# AntFarmReactNative

API: https://github.com/vadim9999/ant-farm-python
UI: https://github.com/vadim9999/ant-farm-react

**Stack:**
- React Native - 0.66.4
- ReactJS - 17.0.2
- Typescript - 4.5.4
- Redux Toolkit - 1.7.1
- reactotron-react-native - 5.0.1
- [react-native-bluetooth-classic](https://github.com/kenjdavidson/react-native-bluetooth-classic) - 1.60.0-rc.20
- Native Base - 3.2.2
- React Navigation - 6.0.6
- react-native-vector-icons - 9.0.0

## Screenshots

<img src = "https://github.com/vadim9999/AntFarmReactNative/blob/master/screenshots/release2-1.png"  height="640" width="320" >
<img src = "https://github.com/vadim9999/AntFarmReactNative/blob/master/screenshots/release2-2.png"  height="640" width="320" >

react-native-bluetooth-classic used to Search for Bluetooth devices, connect to them, receive and transfer data via client and Python server.

This application was created to connect (or change) RPi to WIFI network via bluetooth. App allow search all devices that located around of you. After picking up AntFarm and connected to it will be access this features: setting up wifi network that was found RPi, and get information about what IP is listening web serwer in AntFarm. After this user should be in the same network with AntFarm then open browser and write IP that was displayed App. App has two screens: `Main` and `About app`.

In app you can connect to Ant Farm via bluetooth.  


### How to debug

`adb reverse tcp:9090 tcp:9090`

run reactotron in desktop

## Making release build:

```
cd android
./gradlew clean
./gradlew bundleRelease
```
then going to this `android/app/build/outputs/bundle/release/` path will be available `.aab` file.


Run command to install and run release app on device(also this command builds apk file):

```
npx react-native run-android --variant=release
```
Open folder `android/app/build/outputs/apk/release/` and there will be apk file app-release.apk

NativeBase is a mobile application development system that allows developers to use React Native to create their own mobile applications running on major mobile platforms - Apple iOS and Google Android. Stack of application components is built using its own components of the interface. NativeBase focuses specifically on the look and feel of the interface of the application.

React Navigation extends the React Native framework. His main goal is to improve navigation. It is completely written in javascript.

React Native is a JavaScript framework for writing real mobile apps for iOS and Android. It is based on the Facebook ReactJS library for creating user interfaces, but instead of targeting the browser - aimed at mobile platforms. Web developers can now write mobile apps that look and function as "native". Since most code can be used across platforms, React Native makes it easier to design both for Android and iOS [26].

The components of the application are in AntFarmReactNative / src /.

Screens of previous version of app:

<img src = "https://github.com/vadim9999/AntFarmReactNative/blob/master/screenshots/app1.png"  height="640" width="320" >
<img src = "https://github.com/vadim9999/AntFarmReactNative/blob/master/screenshots/app2.png"  height="640" width="320" >

### History and tries

This project written on React Native. Migrated from https://github.com/vadim9999/react-native-ant-farm because of Expo bug. Can't build apk with EasyBluetoothClassic(easy-bluetooth-classic)

Migrated from `easy-bluetooth-classic` to `react-native-bluetooth-classic`

Tried libraries they displays name of devices as null:
- `react-native-ble-manager`
- `react-native-ble-plx` 
