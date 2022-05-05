import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ExampleContainer } from '@/Containers'
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'


const Tab = createBottomTabNavigator()
const MainSctack = createStackNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={ExampleContainer}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
