import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight, Dimensions } from 'react-native';
import { Fonts } from './src/utils/Fonts';
import Modal from 'react-native-modal';
import ComicList from './src/components/comicList';

const {width, height} =  Dimensions.get('screen')


class linis extends Component {

  static navigationOptions = {
    header: null
  }
  
  render() {
    return (
      
      <View>
        <ComicList navigation={this.props.navigation}/>
      </View>
    );
  }
}

  const styles = StyleSheet.create ({

    infoDesign: {
      width: 30,
      height: 30
    },

      listTitle: {
              fontSize: 20,
               fontFamily: Fonts.Quicksand,
               color: 'black'
      }
  
  
  })

  export default linis