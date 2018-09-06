import React, { Component } from 'React';
import {View, Text, Image , StyleSheet, KeyboardAvoidingView} from 'react-native';
import { Fonts } from '../src/utils/Fonts'
import LoginForm from './LoginForm'
import LinearGradient from 'react-native-linear-gradient'

export default class Login extends Component{
  render(){
            return(
            <LinearGradient colors={['#000046', '#1CB5E0']} style={styles.linearGradient}>
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
                                    <LoginForm navigation={this.props.navigation}/>
                            </View>
                </KeyboardAvoidingView>
            </LinearGradient>
          );
  }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
      },

    container: {
        flex: 1,
    },

    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 150,
        height: 150
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
