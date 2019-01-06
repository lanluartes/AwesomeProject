import React from 'react'
import Details from '../src/components/Details'
import List from '../src/components/List'
import VideoPlayerView from '../src/components/VideoPlayerView'
import ComicList from '../src/components/comicList'
import ComicViewer from '../src/components/comicViewer'
import MyList from '../src/components/MyList'
import DownloadRange from '../src/components/downloadRange'
import QuizPart from '../src/components/quizPart'
import getStarted from '../getStarted'
import Survey from '../survey'

import Splash from '../Splash'
import TabNavigator from './TabNavigator'
import DrawerNavigator from './DrawerNavigator'
import DrawerScreen from './DrawerScreen'

import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

const HomeNavigator = createStackNavigator({

  Survey: {
    screen: Survey
  },

  Tab: {
    screen: TabNavigator,
    navigationOptions:{
      header: null
    }},
  QuizPart: {
    screen: QuizPart,
    navigationOptions:{
      header: null
      }
  },
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

const defaultGetStateForAction = HomeNavigator.router.getStateForAction;

HomeNavigator.router.getStateForAction = (action, state) => {
  switch (action.type) {
    case 'Navigation/OPEN_DRAWER':
    case 'Navigation/DRAWER_OPENED':
      console.log("open");
      break;
      
    case 'Navigation/CLOSE_DRAWER':
    case 'Navigation/DRAWER_CLOSED':
      console.log("close");
      break;
    }

  return defaultGetStateForAction(action, state);
};