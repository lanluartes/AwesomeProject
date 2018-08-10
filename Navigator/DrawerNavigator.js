import React from 'react'
import { View } from 'react-native'

import Splash from '../Splash'

import {createDrawerNavigator} from 'react-navigation';

const DrawerNavigator = createDrawerNavigator({
    Splash: {screen: Splash}
});

export default DrawerNavigator