import React, { Component } from 'React';
import {View, Text, Image , StyleSheet, KeyboardAvoidingView} from 'react-native';
import { Fonts } from '../src/utils/Fonts'
import LoginForm from './LoginForm'

export default class Login extends Component{
  render(){
            return(
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.logoContainer}>

                        <Image
                        style={styles.logo}
                        source={require('../assets/Logo/wash-logo.png')}
                        />
                        <Text style={styles.title}>
                            Wash app kids!
                        </Text>


                    </View>

                        <View style={styles.formContainer}>
                                <LoginForm />
                        </View>
                </KeyboardAvoidingView>
          );
  }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:  '#0B3954'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        color: '#BFD7EA',
        marginTop: 10,
        width: 160,
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: Fonts.Quicksand,
        fontSize: 21,
        opacity: 0.9
    }

})
