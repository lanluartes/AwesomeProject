import React from 'react';
import {View} from 'react-native';
import AppNavigator from './Navigator/StackNavigator'
import Orientation from 'react-native-orientation'

export default class App extends React.Component {
  componentWillMount(){
    Orientation.lockToPortrait()
  }

  render() {
    return (
      <View style={{flex: 1}}>
          <AppNavigator />
      </View>
    );
  }
}
