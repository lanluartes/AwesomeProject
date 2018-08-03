import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight, Dimensions } from 'react-native';
import { Fonts } from '../utils/Fonts';
import Modal from 'react-native-modal';

const {width, height} =  Dimensions.get('screen')

class ComicDetails extends Component{

    //state of modal
    state = {
        modalVisible: false,
      };

    //state handler of modal
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render(){
        return(<Animatable.View animation="bounce" style={{borderRadius: 10}}>
        <Modal
        backdropColor='black'
        animationType="slide"
        isVisible={this.state.modalVisible}
        onRequestClose={() => {
            alert('Modal has been closed.');
            this.setModalVisible(false);
        }}
        style={{margin: 22, marginBottom:22,  borderRadius: 20, backgroundColor: '#F5FCFF', height: height-100}}
        >
        <Animatable.View animation="bounceInUp" >

            <View>
                <Text style={styles.titleShow}>
                    GUMANA KA NAMAN TANGINA
                    {this.state.currentComicData.ComicAuthor}
                </Text>

            <TouchableHighlight
                onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
            </TouchableHighlight>
            </View>

        </Animatable.View>

        </Modal>
    </Animatable.View>
    );}
}

const styles = StyleSheet.create({

    text: {
        color: '#F5FCFF',
        fontSize: 18,
        fontFamily: Fonts.QuicksandReg
    },

    titleShow: {
        fontSize: 35,
        paddingLeft: 10,
        marginBottom: 10,
        color: '#F5FCFF',
        fontFamily: Fonts.Quicksand
    },


})