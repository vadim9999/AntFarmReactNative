import { StyleSheet, Alert, Text, View, ImageBackground, Button, TextInput, CheckBox} from 'react-native';
import React from 'react';

class AboutApplication extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Про додаток',
      
    };
  
    render() {
      return (
       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Про додаток</Text>
       
      </View>
      );
    }
  }

export default AboutApplication