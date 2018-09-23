import React from 'react'
import LogInNavigator from './LogInNavigator'
import HomeNavigator from './StackNavigator'

import {createStackNavigator} from 'react-navigation';

const AppNavigator = createStackNavigator({


  LogIn: {
      screen: LogInNavigator,
      navigationOptions:{
        header: null
        }
  },
  Home: {
      screen: HomeNavigator,
      navigationOptions:{
        header: null
        }
  }
},
{
  headerMode: 'screen'
}
);

export default AppNavigator;
