import { StyleSheet, Alert, Text, View, ImageBackground, Button, TextInput, CheckBox} from 'react-native';
import React from 'react';

class HomeScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Home',
      
    };
  
    render() {
      return (
        <Button
          onPress={() => {this.props.navigation.navigate('Notifications')
            this.props.navigation.toggleDrawer();
          }}
          title="Go to notifications"
        />
      );
    }
  }

export default HomeScreen