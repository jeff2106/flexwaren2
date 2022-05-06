import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ExampleContainer } from '@/Containers'
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Views
import FirstView from '../Containers/Views/FirstView';
import CreatUserI from '../Containers/Views/CreatUserI';
import NmberVerif1 from '../Containers/Views/NmberVerif1';
import NmberVerif2 from '../Containers/Views/NmberVerif2';
import NmberVerifL1 from '../Containers/Views/NmberVerifL1';
import NmberVerifL2 from '../Containers/Views/NmberVerifL2';
import PhotoInscription1 from '../Containers/Views/PhotoInscription1';
import PhotoInscription2 from '../Containers/Views/PhotoInscription2';
import PhotoInscription3 from '../Containers/Views/PhotoInscription3';
import PhotoInscription4 from '../Containers/Views/PhotoInscription4';
import PhotoInscription5 from '../Containers/Views/PhotoInscription5';
import PhotoInscription6 from '../Containers/Views/PhotoInscription6';
import CarRegister from '../Containers/Views/CarRegister';
import BeforeLastInsertUser from '../Containers/Views/BeforeLastInsertUser';
import LastViewInsertUser from '../Containers/Views/LastViewInsertUser';
import PolitiqueConf from '../Containers/Views/politiqueConf';
//


const Tab = createBottomTabNavigator()
const MainSctack = createStackNavigator()
const Drawer = createDrawerNavigator()
// @refresh reset
const MainNavigatorAuth = () => {
  return (
    <MainSctack.Navigator screenOptions={{
      drawerStyle: {
      backgroundColor: 'white',
      },
      headerShown: false,
      swipeEdgeWidth: 0
    }}>
      <Drawer.Screen name="FirstView" component={FirstView}  />
      <MainSctack.Screen name="PolitiqueConf" component={PolitiqueConf} />
      <MainSctack.Screen name="CreatUserI" component={CreatUserI} />
      <MainSctack.Screen name="NmberVerif1" component={NmberVerif1} />
      <MainSctack.Screen name="NmberVerif2" component={NmberVerif2} />
      <MainSctack.Screen name="NmberVerifL1" component={NmberVerifL1} />
      <MainSctack.Screen name="NmberVerifL2" component={NmberVerifL2} />
      <MainSctack.Screen name="PhotoInscription1" component={PhotoInscription1} />
      <MainSctack.Screen name="PhotoInscription2" component={PhotoInscription2} />
      <MainSctack.Screen name="PhotoInscription3" component={PhotoInscription3} />
      <MainSctack.Screen name="PhotoInscription4" component={PhotoInscription4} />
      <MainSctack.Screen name="PhotoInscription5" component={PhotoInscription5} />
      <MainSctack.Screen name="PhotoInscription6" component={PhotoInscription6} />
      <MainSctack.Screen name="CarRegister" component={CarRegister} />
      <MainSctack.Screen
    name="BeforeLastInsertUser"
    component={BeforeLastInsertUser}
          />
          <MainSctack.Screen
            name="LastViewInsertUser"
            component={LastViewInsertUser}
          />
    </MainSctack.Navigator>
  )
}

export default MainNavigatorAuth
