/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import { Fonts } from '../src/utils/Fonts'

export default class LoginForm extends Component {
  render() {
    return (

      <View style={styles.container}>
      <StatusBar 
      barStyle="light-content"
      translucent
      />
        <TextInput 
          placeholder="username or email"
          placeholderTextColor="rgba(215, 218, 229, 0.7)"
          style={styles.input}
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid='transparent'
        />
         <TextInput 
          placeholder="password"
          placeholderTextColor="rgba(215, 218, 229, 0.7)"
          style={styles.input}
          returnKeyType="go"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid='transparent'
          ref={(input) => this.passwordInput = input}
        />

        <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(215, 218, 229, 0.7)',
    marginBottom: 20,
    color: '#165179',
    fontFamily: Fonts.Quicksand,
    fontSize: 17
  },
  buttonContainer: {
    backgroundColor: '#227AB5',
    paddingVertical: 13
  },
  buttonText: {
    fontFamily: Fonts.Quicksand,
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  }
});
