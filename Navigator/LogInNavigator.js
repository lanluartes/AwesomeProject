import React from 'react'
import Login from '../Login/Login.js'
import Register from '../Login/Register'

import {createStackNavigator} from 'react-navigation';

const LogInNavigator = createStackNavigator({
  Login: {
      screen: Login,
      navigationOptions:{
     header: null
        }
     },
  Register: {
    screen: Register,
    navigationOptions:{
      header: null
    }  
  }
}
);

export default LogInNavigator;
