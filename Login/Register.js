import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native';
import * as Animatable from 'react-native-animatable'
import Modal from 'react-native-modal'

import { Fonts } from '../src/utils/Fonts'
import Axios from '../node_modules/axios';

export default class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
                    newUsername: "", 
                    userIsAllowed: false,
                    userPassAllowed: false,
                    newPassword: "", 
                    confirmPassword: "",
                    userExists: false,
                    forTheHead: "Just fill out the fields then we'll handle the rest. 😃",
                    thisColor: "rgba(19, 41, 61, 0.7)",
                    passwordColor: "rgba(19, 41, 61, 0.7)",
                    confirmColor: "rgba(19, 41, 61, 0.7)",
                }
    }

    _assignUsername = data => {
        this.setState({newUsername: data.newUsername})
        this._verifyUsername(data)
    }

    _verifyUsername = data => {
        const axios = require('axios');
        const myData = new FormData();
        myData.append("username",data.newUsername);

        axios({
            method: 'POST',
            url: 'http://10.0.2.2/wash-admin/public/checkUser',
            data: myData
          })
          .then(res => this._checkIfExists(res.data,data.newUsername.length));
        
    }

    _checkIfExists = (data,strLength) => {
        if(strLength === 0){
            this.setState({thisColor: 'rgba(19, 41, 61, 0.7)'})
            this.setState({forTheHead: "Just fill out the fields then we'll handle the rest. 😃"})
        }else if(strLength < 8){
            this.setState({thisColor: '#E71D36'})
                if((8-strLength) === 1){
                    this.setState({forTheHead: "Add "+ (8-strLength) + " more character kiddo! 😁"})
                }else{
                    this.setState({forTheHead: "Add "+ (8-strLength) + " more characters kiddo! 😁"})
                }
        }else if(data.userExists === 'false'){
            this.setState({userExists: false})
            this.setState({thisColor: '#2EC4B6'})
            this.setState({forTheHead: "Nice! This username's not yet taken. 🙌"})
            this.setState({userIsAllowed: true})
        }else{
            this.setState({userExists: true})
            this.setState({thisColor: '#E71D36'})
            this.setState({forTheHead: "Oh snap! This username's taken. 😔"})
        }

    }

    _assignPassword = data => {
        this.setState({newPassword: data.newPassword})
        this._checkIfAcceptable(data, data.newPassword.length)
    }

    _checkIfAcceptable = (data, strLength) => {
        if(strLength === 0){
            this.setState({passwordColor: 'rgba(19, 41, 61, 0.7)'})
            this.setState({forTheHead: "Just fill out the fields then we'll handle the rest. 😃"})
        }else if(strLength < 7){
            this.setState({passwordColor: '#E71D36'})
            this.setState({forTheHead: "Too weak, add "+(12-strLength)+" more characters. 😦"})
        }else if(strLength < 10){
            this.setState({passwordColor: '#FFB400'})
            this.setState({forTheHead: "Moderate seems... fine... 🤔"})
            this.setState({userPassAllowed: true})
        }else if(strLength < 13){
            this.setState({passwordColor: '#2EC4B6'})
            this.setState({forTheHead: "Much better! 🙌"})
            this.setState({userPassAllowed: true})
        }
    }

    _checkIfMatch = (data) => {
        if(data.confirmPassword !== this.state.newPassword){
            this.setState({forTheHead: "Password does not match. 🙅‍♀"})
            this.setState({confirmColor: '#E71D36'})
        }else if(data.confirmPassword === this.state.newPassword){
            this.setState({forTheHead: "All set and ready to go. 👍"})
            this.setState({confirmColor: '#2EC4B6'})
        }
    }

    _register = () =>{
        const axios = require('axios');
        const myData = new FormData();
        if(this.state.userIsAllowed === true && this.state.userPassAllowed === true){

            myData.append("username",this.state.newUsername);
            myData.append("password",this.state.newPassword);
            
            axios({
                method: 'POST',
                url: 'http://10.0.2.2/wash-admin/public/Register',
                data: myData
            })
            .then(res => {if(res.data.status === 'success'){
                this.props.navigation.navigate('Login')
            }});
        }
    }

    render(){
              return(
                <KeyboardAvoidingView style={{flex: 1}}>
                    <View style={styles.mainContainer}>
                            <View style={{flex:1, justifyContent: 'center'}}>
                                <Text style={styles.title}>
                                     {this.state.forTheHead}
                                </Text>
                            </View>
                            
                            <View style={{flex:1}}>
                                <TextInput 
                                    placeholder="username or email"
                                    placeholderTextColor="rgba(215, 218, 229, 0.7)"
                                    style={[styles.input, {backgroundColor: this.state.thisColor}]}
                                    returnKeyType="next"  
                                    maxLength={30}      
                                    onChangeText={(newUsername) => this._assignUsername({newUsername})}
                                    onSubmitEditing={() => this.passwordInput.focus()}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    ref={(input) => this.userName = input}
                                    autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                />
                                <TextInput 
                                    placeholder="password"
                                    placeholderTextColor="rgba(215, 218, 229, 0.7)"
                                    style={[styles.input, {backgroundColor: this.state.passwordColor}]}
                                    returnKeyType="go"
                                    onChangeText={(newPassword) => this._assignPassword({newPassword})}
                                    onSubmitEditing={() => this.confirmPassword.focus()}
                                    secureTextEntry
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    ref={(input) => this.passwordInput = input}
                                />
                                <TextInput 
                                    placeholder="confirm password"
                                    placeholderTextColor="rgba(215, 218, 229, 0.7)"
                                    style={[styles.input, {backgroundColor: this.state.confirmColor}]}
                                    returnKeyType="go"
                                    onChangeText={(confirmPassword) => this._checkIfMatch({confirmPassword})}
                                    secureTextEntry
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    ref={(input) => this.confirmPassword = input}
                                />
                                    <TouchableOpacity
                                    onPress={() => {this._register()}}
                                    style={styles.buttonContainer}
                                    >
                                        <Text style={styles.buttonText}>REGISTER</Text>
                                    </TouchableOpacity>
                            </View>

                    </View>
                </KeyboardAvoidingView>
            );
    }
  }

  let styles = StyleSheet.create({
    buttonText: {
        fontFamily: Fonts.Quicksand,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center'
      },
    buttonContainer: {
        backgroundColor: '#7FB800',
        paddingVertical: 13,
        alignContent: 'center',
        height: 40,
        marginBottom: 20,
        margin: 12,
        justifyContent: 'center'
      },
      mainContainer: {
          flex: 1,
          backgroundColor: '#006494',
          justifyContent: 'center',
          alignContent: 'center'
      },
      title: {
        textAlign: 'center',
        fontFamily: Fonts.Quicksand,
        fontSize: 21,
        color: '#E8F1F2'
      },
      input: {
        height: 40,
        backgroundColor: 'rgba(19, 41, 61, 0.7)',
        marginBottom: 20,
        color: '#E8F1F2',
        fontFamily: Fonts.Quicksand,
        margin: 12,
        fontSize: 17
      },
  });