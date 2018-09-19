import React, {Component} from 'react';
import {StyleSheet, Text, View,Dimensions } from 'react-native';
import { Fonts } from './src/utils/Fonts';
import ComicList from './src/components/comicList';

class linis extends Component {

  static navigationOptions = {
    header: null
  }
  
  render() {
    return (
      
      <View style={{flex: 1}}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
                Comics
            </Text>
          </View>

          <View style={{flex: 5}}>
             <ComicList navigation={this.props.navigation}/>
          </View>
      </View>
    );
  }
}

  const styles = StyleSheet.create ({

    header:{
      flex: 0.35,
      backgroundColor: '#FFE066',
      justifyContent: 'center',
      alignContent: 'center'
    },

    headerText: {
      fontSize: 20,
       textAlign: 'center', 
       fontFamily: Fonts.Quicksand,
       color: '#00A6ED'
    },

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