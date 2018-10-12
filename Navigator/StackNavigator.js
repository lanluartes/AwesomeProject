import React from 'react'
import Details from '../src/components/Details'
import List from '../src/components/List'
import VideoPlayerView from '../src/components/VideoPlayerView'
import ComicList from '../src/components/comicList'
import ComicViewer from '../src/components/comicViewer'
import MyList from '../src/components/MyList'
import DownloadRange from '../src/components/downloadRange'

import Splash from '../Splash'
import TabNavigator from './TabNavigator'
import DrawerNavigator from './DrawerNavigator'
import DrawerScreen from './DrawerScreen'

import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

const HomeNavigator = createStackNavigator({
  Tab: {
    screen: TabNavigator,
    navigationOptions:{
    header: null
    }},
  comicViewer: {
    screen: ComicViewer
  },
  List: {screen: List},
  Details: {screen: Details,
    navigationOptions:{
      headerStyle: {backgroundColor: '#181818'},
      headerTintColor: 'white'
    }},
  Video: {screen: VideoPlayerView},
  ComicList: {screen: ComicList},
  ComicDownload: {screen: DownloadRange,
    navigationOptions:{
      headerStyle: {backgroundColor: '#181818'},
      headerTintColor: 'white'
    }
  }
},
{
  headerMode: 'screen'
}
);

export default HomeNavigator = createDrawerNavigator({
    Home: {screen: HomeNavigator},
    MyList: {screen: MyList}
},
{
  contentComponent: props => <DrawerScreen {...props} />
})
