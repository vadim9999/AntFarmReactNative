import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';

import styles from './styles';

export default class Loader extends React.Component {
  state = {
    modalVisible: this.props.loading,
  };

  render(){
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={this.props.loading}
        onRequestClose={() => {this.props.onChangeActivity(false)}}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={this.props.loading} />
          </View>
        </View>
      </Modal>
    )
  }
}


