# AntFarmReactNative

This project written on React Native. 

Technologies that was used to create app:
- React Native
- Easy Bluetooth Classic 
- NativeBase
- React Navigation

Easy Bluethooth Classic used to Search for Bluetooth devices, connect to them, receive and transfer data via client and Python server.

This application was created to connect (or change) RPi to WIFI network via bluetooth. App allow search all devices that located around of you. After picking up AntFarm and connected to it will be access this features: setting up wifi network that was found RPi, and get information about what IP is listening web serwer in AntFarm. After this user should be in the same network with AntFarm then open browser and write IP that was displayed App. App has two screens: `Main` and `About app`.

In app you can connect to Ant Farm via bluetooth.  

Easy bluetooth classic - a library that is designed to interact with devices via Bluetooth. It's key features are: Search for Bluetooth devices, connect to them, receive and transfer data. To use it, you need Android version not lower than 4.1 and React Native not lower than 0.40.0.
NativeBase is a mobile application development system that allows developers to use React Native to create their own mobile applications running on major mobile platforms - Apple iOS and Google Android. Stack of application components is built using its own components of the interface. NativeBase focuses specifically on the look and feel of the interface of the application.
React Navigation extends the React Native framework. His main goal is to improve navigation. It is completely written in javascript.
React Native is a JavaScript framework for writing real mobile apps for iOS and Android. It is based on the Facebook ReactJS library for creating user interfaces, but instead of targeting the browser - aimed at mobile platforms. Web developers can now write mobile apps that look and function as "native". Since most code can be used across platforms, React Native makes it easier to design both for Android and iOS [26].

The components of the application are in AntFarmReactNative / src /. The MainScreen.js main page (AntFarmReactNative / src / screens / main /) includes the following components: Bluetooth device scan key, device connection, change of WiFi networks, network key and password password, additional keys - «Learn IP» the RPi address, and the "Update list" of the networks.

<img src = "https://github.com/vadim9999/AntFarmReactNative/blob/master/screenshots/app1.png"  height="640" width="320" >
<img src = "https://github.com/vadim9999/AntFarmReactNative/blob/master/screenshots/app2.png"  height="640" width="320" >
