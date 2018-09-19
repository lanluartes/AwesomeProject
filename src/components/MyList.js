// this file will contain the prefences of each user

import React from 'react'
import {View, Text, StyleSheet, Image, TouchableWithoutFeedback, Switch} from 'react-native'
import { Fonts } from '../utils/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome'

import MyView from './MyProps/MyView'
import MyComicList from './MyProps/MyComicList'
import MyVideoList from './MyProps/MyVideoList'


export default class MyList extends React.Component {

    constructor(props){
        super(props);
            this.state = {
                isTrue: false
            }
      }

      _updateStatus = value => {
              this.setState({isTrue: value})
      }

    render(){

        return(
            <View style={{flex: 1}}>
                <View style={styles.header}>

                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Home')}}>
                    <Icon 
                    name={'arrow-left'}
                    size={25}
                    style={{padding: 10}}
                    />
                </TouchableWithoutFeedback>

                    <Text style={styles.headerText}>
                        {this.state.isTrue ? "Videos" : "Comics"}
                    </Text>

                    <Switch
                    onValueChange={value => this._updateStatus(value)}
                    value={this.state.isTrue}
                    style={{padding: 10}}
                    />
                </View>

                <View style={{flex: 5}}>
                    <MyView hide={this.state.isTrue} style={{flex: 1}}>
                            <MyComicList />
                    </MyView>
                    <MyView hide={!this.state.isTrue} style={{flex: 1}}>
                            <MyVideoList navigation={this.props.navigation} user={this.props.navigation.state.params.passProps}/>
                    </MyView>
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
    header:{
        flex: 0.35,
        backgroundColor: '#FFE066',
        justifyContent: 'space-between',
        alignContent: 'center',
        flexDirection: 'row'
    },

    headerText: {
        fontSize: 20,
         textAlign: 'center', 
         fontFamily: Fonts.Quicksand,
         color: '#00A6ED',
         padding: 10
    },
  });