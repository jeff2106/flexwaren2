import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

//LOGIN and SIGN View
import Index from '../Views/index';
import FirstView from '../Views/FirstView';
import CreatUserI from '../Views/CreatUserI';
import NmberVerif1 from '../Views/NmberVerif1';
import NmberVerif2 from '../Views/NmberVerif2';
import NmberVerifL1 from '../Views/NmberVerifL1';
import NmberVerifL2 from '../Views/NmberVerifL2';
import PhotoInscription1 from '../Views/PhotoInscription1';
import PhotoInscription2 from '../Views/PhotoInscription2';
import PhotoInscription3 from '../Views/PhotoInscription3';
import PhotoInscription4 from '../Views/PhotoInscription4';
import PhotoInscription5 from '../Views/PhotoInscription5';
import PhotoInscription6 from '../Views/PhotoInscription6';
import CarRegister from '../Views/CarRegister';
import BeforeLastInsertUser from '../Views/BeforeLastInsertUser';
import LastViewInsertUser from '../Views/LastViewInsertUser';
import PolitiqueConf from '../Views/politiqueConf';


const RootStack = createNativeStackNavigator();

function RoutesInc({navigation}) {
  return (
      <RootStack.Navigator screenOptions={{
          headerShown: false
        }}>
          <RootStack.Screen name="FirstView" component={FirstView} />
          <RootStack.Screen name="PolitiqueConf" component={PolitiqueConf} />
          <RootStack.Screen name="CreatUserI" component={CreatUserI} />
          <RootStack.Screen name="NmberVerif1" component={NmberVerif1} />
          <RootStack.Screen name="NmberVerif2" component={NmberVerif2} />
          <RootStack.Screen name="NmberVerifL1" component={NmberVerifL1} />
          <RootStack.Screen name="NmberVerifL2" component={NmberVerifL2} />
          <RootStack.Screen name="PhotoInscription1" component={PhotoInscription1} />
          <RootStack.Screen name="PhotoInscription2" component={PhotoInscription2} />
          <RootStack.Screen name="PhotoInscription3" component={PhotoInscription3} />
          <RootStack.Screen name="PhotoInscription4" component={PhotoInscription4} />
          <RootStack.Screen name="PhotoInscription5" component={PhotoInscription5} />
          <RootStack.Screen name="PhotoInscription6" component={PhotoInscription6} />
          <RootStack.Screen name="CarRegister" component={CarRegister} />
          <RootStack.Screen
            name="BeforeLastInsertUser"
            component={BeforeLastInsertUser}
          />
          <RootStack.Screen
            name="LastViewInsertUser"
            component={LastViewInsertUser}
          />
    </RootStack.Navigator>
  );
}

export default RoutesInc;
