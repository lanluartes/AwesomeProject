import React from 'react'
import Details from '../src/components/Details'
import List from '../src/components/List'
import VideoPlayerView from '../src/components/VideoPlayerView'
import ComicList from '../src/components/comicList'
import Login from '../Login/Login.js'
import Register from '../Login/Register'
import ComicViewer from '../src/components/comicViewer'
import MyList from '../src/components/MyList'

import Splash from '../Splash'
import TabNavigator from './TabNavigator'
import DrawerNavigator from './DrawerNavigator'
import DrawerScreen from './DrawerScreen'

import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

const AppNavigator = createStackNavigator({
  Login: {
      screen: Login,
      navigationOptions:{
     header: null
        }
     },
  Tab: {
    screen: TabNavigator,
    navigationOptions:{
    header: null
    }},
  comicViewer: {
    screen: ComicViewer
  },
  Register: {
    screen: Register,
    navigationOptions:{
      header: null
    }  
  },
  List: {screen: List},
  Details: {screen: Details,
    navigationOptions:{
      headerStyle: {backgroundColor: '#181818'},
      headerTintColor: 'white'
    }},
  Video: {screen: VideoPlayerView},
  ComicList: {screen: ComicList}
},
{
  headerMode: 'screen'
}
);

export default AppNavigator = createDrawerNavigator({
    Home: {screen: AppNavigator},
    MyList: {screen: MyList}
},
{
  contentComponent: props => <DrawerScreen {...props} />
})
