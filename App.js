import React from 'react';
import {AppRegistry, StyleSheet, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import Orientation from 'react-native-orientation'
import Splash from './Splash';
import Home from './Home';

import Kwentuhan from './KwentuhanTayo';
import Details from './src/components/Details'
import List from './src/components/List'
import VideoPlayerView from './src/components/VideoPlayerView'

import linis from './linistips';
import ComicList from './src/components/comicList'

export default class App extends React.Component {
  componentWillMount(){
    Orientation.lockToPortrait()
  }

  render() {
    return (
        <AppNavigator />
    );
  }
}

const AppNavigator = createStackNavigator({
  HomeScreen: {screen: Home},
  Video: {screen: VideoPlayerView},
  LinisTips: { screen: linis},
  KwentuhanTayo: {screen: Kwentuhan},

  Details: {screen: Details},

  List: {screen: List},
  ComicList: {screen: ComicList}


},

{ headerMode: 'screen' }
);

const navigationOptions={

    title: 'Home',
    headerLeft: <Text>Left button</Text>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
