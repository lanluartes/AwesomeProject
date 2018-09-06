// this file will contain the prefences of each user

import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'

export default class MyList extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Notifications',
        drawerIcon: ({ tintColor }) => (
          <Image
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      };

    render(){
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 0.4, backgroundColor: 'black'}}>

                </View>
                <View style={{flex: 1}}>

                </View>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
  });