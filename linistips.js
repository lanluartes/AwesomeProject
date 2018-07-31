import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableOpacity, Image, Modal, TouchableHighlight, Dimensions } from 'react-native';
import { Fonts } from './src/utils/Fonts';

const {width, height} =  Dimensions.get('screen')


class linis extends Component {

  static navigationOptions = { 
    headerRight: (<View><Image style={{width: 40, height: 40, marginRight: 10, alignSelf: 'center'}} source={require('./assets/Icons/info.png')}/></View>),
      headerTitle:<Text style={{
        flex: 1,
        color:'black',
        alignSelf:'center',
        textAlign: 'center',
        fontFamily: Fonts.Quicksand,
        fontSize:25,
        marginBottom: 5
       }}>
    </Text>
  }
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <View style={{borderRadius: 10}}>
          <Modal
            animationType="slide"
            transparent
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
              this.setModalVisible(false);
            }}>

            <View style={{margin: 22, marginBottom:22,  borderRadius: 10, backgroundColor: 'powderblue', height: height-100}}>
              <View>
                <Text>Hello World!</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

  const styles = StyleSheet.create ({

    infoDesign: {
      width: 30,
      height: 30
    }


  })

  export default linis