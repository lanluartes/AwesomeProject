import React from 'react';
import {AppRegistry, StyleSheet, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import Splash from './Splash';
import Home from './Home';
import linis from './linistips';
import Kwentuhan from './KwentuhanTayo';
import List from './src/components/List'
import comicList from './src/components/comicList'
import Details from './src/components/Details'
import VideoPlayerView from './src/components/VideoPlayerView'
import Orientation from 'react-native-orientation'

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
  List : {screen: List},
  listComics: {screen: comicList},
  Details: {screen: Details},

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
