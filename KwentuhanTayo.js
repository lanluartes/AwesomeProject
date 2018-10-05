import React from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Fonts } from './src/utils/Fonts';

import List from './src/components/List';

const NoTransition = {
  opacity: {
    from: 1,
    to: 1,
    min: 1,
    max: 1,
    type: 'linear',
    extrapolate: 'false',
    round: 100
  }
}

class Kwentuhan extends React.Component {

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
        Videos
    </Text>
}



render() {
      return (         
        <View style={styles.container}>

          <View style={styles.header}>
            <Text style={styles.headerText}>
                Videos
            </Text>
          </View>

          <View style={{flex: 5}}>
            <List navigation={this.props.navigation} user={this.props.navigation.state.params.passProps}/>
          </View>

        </View>
      )
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
    container: {
      flex: 1,
      flexDirection: 'column'
    },


    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },

    tileFeature: {

    },

    infoDesign: {
      width: 30,
      height: 30
    }

  })

  export default Kwentuhan