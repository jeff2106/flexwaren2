import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ExampleContainer } from '@/Containers'
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Views
//Screen Import//
import Menu from '../Containers/Components/Menu'
import { AuthContext } from '../Containers/Components/context';
import MainNavigatorAuth from './Main_Auth'
import FirstView from '../Containers/Views/FirstView'
//

/*
<Drawer.Navigator screenOptions={{
      drawerStyle: {
      backgroundColor: 'white',
      },
      headerShown: false,
      swipeEdgeWidth: 0
    }}>
      <Drawer.Screen name="FirstView" component={FirstView}  />
      
    </Drawer.Navigator>
*/
const Tab = createBottomTabNavigator()
const MainSctack = createStackNavigator()
const Drawer = createDrawerNavigator()
// @refresh reset
const MainNavigator = () => {
  return (
    <MainNavigatorAuth/>
    
  )
}

export default MainNavigator
