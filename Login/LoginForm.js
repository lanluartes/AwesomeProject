
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import * as Animatable from 'react-native-animatable'
import Modal from 'react-native-modal'

import { Fonts } from '../src/utils/Fonts'

export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {username: "", password: ""};
    this.state = {status: "disconnected"}
    this.state = {modalVisible: false}
    this.state = {registration:{
        newUsername: "",
        newPassword: "",
        confirmPassword: "",
    }}
  }

  _logIn = data => {
    const axios = require('axios');
    const myData = new FormData();
    myData.append("username",data.username);
    myData.append("password",data.password);

    axios({
      method: 'POST',
      url: 'http://10.0.2.2/wash-admin/public/login',
      data: myData
    })
    .then(res => this._verifyLogIn(JSON.parse(res.data)));
  }

  _verifyLogIn = data =>{

     if(data.connection === "connected"){
       this.props.navigation.navigate('Tab', {passProps: data});
           
    }else if(data.connection === "failed"){
       this.setModalVisible(true)
    }

  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
}

_register = () => {
  this.props.navigation.navigate('Register')
}

  render() {
    return (

      <View style={styles.container}>

        <View>
          <TextInput 
            placeholder="username or email"
            placeholderTextColor="rgba(215, 218, 229, 0.7)"
            style={styles.input}
            returnKeyType="next"        
            onChangeText={(username) => this.setState({username})}
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
            onChangeText={(password) => this.setState({password})}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid='transparent'
            ref={(input) => this.passwordInput = input}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>

            <View style={styles.registerButton}>
              <TouchableOpacity
                  onPress={() => {this._register()}}
                >
                    <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {this._logIn(this.state)}}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>

          </View>
        </View>

        <Animatable.View animation="bounce">
                    <Modal
                    backdropColor='black'
                    animationType="slide"
                    isVisible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                    }}
                    onBackdropPress={() => {this.setModalVisible(false)}}
                    >
                  <Animatable.View animation="bounceInUp" style={styles.modalContent}>

                            
                            <Text style={styles.modalText}>
                                There was something wrong logging in. Maybe your password or your username?😥
                            </Text>      

                          <TouchableWithoutFeedback
                              onPress={() => {
                              this.setModalVisible(!this.state.modalVisible);
                              }}>
                              <View style={styles.button}>
                                  <Text style={styles.modalTitle}>Try again</Text>
                              </View>
                          </TouchableWithoutFeedback>
                          

                      </Animatable.View>
                    </Modal>
          </Animatable.View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  registerButton: {
    paddingVertical: 13,
    flex: 1,
    backgroundColor: '#028090'
  },

  button: {
    backgroundColor: '#227AB5',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

  modalTitle: {
    textAlign: 'center',
    fontFamily: Fonts.Quicksand,
    color: 'white'
  },

  modalText: {
    textAlign: 'center',
    fontFamily: Fonts.Quicksand,
    fontSize: 17,
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

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
    paddingVertical: 13,
    flex: 1
  },
  
  buttonText: {
    fontFamily: Fonts.Quicksand,
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  }
});
