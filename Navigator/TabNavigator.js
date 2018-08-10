import React from 'react'
import Home from '../Home';
import Kwentuhan from '../KwentuhanTayo';
import linis from '../linistips';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Fonts } from '../src/utils/Fonts';

import {createBottomTabNavigator} from 'react-navigation';




const TabNavigator = createBottomTabNavigator({
  Comics: { screen: linis },
  Home: {screen: Home},
  Videos: {screen: Kwentuhan}, 
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `md-home`;
      } else if (routeName === 'Videos') {
        iconName = `md-play`;
      }else if (routeName === 'Comics') {
        iconName = `md-book`;
      }

      return <Ionicons name={iconName} size={30} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#3498db',
    inactiveTintColor: 'gray',
    labelStyle: {
      fontSize: 12,
      fontFamily: Fonts.Quicksand
    }
  },
}
);



export default TabNavigator