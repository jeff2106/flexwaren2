import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {View, Text, Image, ActivityIndicator, Platform,Alert} from 'react-native'
import { ExampleContainer } from '@/Containers'
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import PushNotification from "react-native-push-notification";
import Pusher from 'pusher-js/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import navigationRef from '../Navigators/utils'
//Views
//Screen Import//
import Menu from '../Containers/Components/Menu'
import MainNavigatorAuth from './Main_Auth'
import {requestMultiple, PERMISSIONS,openSettings} from 'react-native-permissions';

//Screen Import//
import { AuthContext } from '../Containers/Components/context';


//LOGIN and SIGN View
import Index from '../Containers/Views/index';
import PolitiqueConf from '../Containers/Views/politiqueConf';
import PaymentMethode from '../Containers/Views/paymentMethode'
import PaymentConfirmation from '../Containers/Views/PaymentConfirmation'
import Securite from '../Containers/Views/Securite';
import DetailSecurite from '../Containers/Views/detailsSecurite';
import Historique from '../Containers/Views/Historique';
import Dashboard from '../Containers/Views/Dashboard';


//INTERVILLE VIEW
import Paiement from '../Containers/Views/Intervilles/Pages/Paiment';
import ResultDrivers from '../Containers/Views/Intervilles/Pages/ResultDrivers';
import FindDrivers from '../Containers/Views/Intervilles/Pages/FindDrivers';
import RideStart from '../Containers/Views/Intervilles/Pages/RideStart';

import IndexP from '../Containers/Views/IntervillesP/Pages/index';
import Courses from '../Containers/Views/IntervillesP/Pages/courses.js';
import PackPrice from '../Containers/Views/IntervillesP/Pages/PackagePrice.js';
import PaimentPI from '../Containers/Views/IntervillesP/Pages/paimentPI';

import NAlert from '../Containers/Views/IntervillesP/Pages/NAlert.js';
import CoursesDetails from '../Containers/Views/IntervillesP/Pages/CoursesDetails.js';
import CoursesStart from '../Containers/Views/IntervillesP/Pages/CoursesStart.js';
import CoursesEnd from '../Containers/Views/IntervillesP/Pages/CoursesEnd.js';


//TRAVAILLEUR VIEW
import PaiementT from '../Containers/Views/Travailleurs/Pages/PaimentT';
import ResultDriversT from '../Containers/Views/Travailleurs/Pages/ResultDriversT';
import FindDriversT from '../Containers/Views/Travailleurs/Pages/FindDriversT';
import RideStartT from '../Containers/Views/Travailleurs/Pages/RideStartT';

import IndexPT from '../Containers/Views/TravailleursP/Pages/index';
import CoursesT from '../Containers/Views/TravailleursP/Pages/courses.js';
import PackPriceT from '../Containers/Views/TravailleursP/Pages/PackagePrice.js';
import PaimentPIT from '../Containers/Views/TravailleursP/Pages/paimentPI';

import NAlertT from '../Containers/Views/TravailleursP/Pages/NAlert.js';
import CoursesDetailsT from '../Containers/Views/TravailleursP/Pages/CoursesDetails.js';
import CoursesStartT from '../Containers/Views/TravailleursP/Pages/CoursesStart.js';
import CoursesEndT from '../Containers/Views/TravailleursP/Pages/CoursesEnd.js';

//COVOITURAGE //
import AccueilCovoiturage from '../Containers/Views/Covoiturage/Pages/index';
import FetchDriversCovoiturage from '../Containers/Views/Covoiturage/Pages/FetchDriversCovoiturage';
import CourseStart from '../Containers/Views/Covoiturage/Pages/courseStart';


//COVOITURAGE DRIVERS//
import AccueilCovoiturageP from '../Containers/Views/CovoiturageP/Pages/AccueilCovoiturageP';
import RaceStartFindCustomers from '../Containers/Views/CovoiturageP/Pages/RaceStartFindCustomers';
import RaceCourseStart from '../Containers/Views/CovoiturageP/Pages/RaceCourseStart';
import RaceInPending from '../Containers/Views/CovoiturageP/Pages/RaceInPending';
import PackChooseCov from '../Containers/Views/CovoiturageP/Pages/PackChooseCov';
import PackPriceCov from '../Containers/Views/CovoiturageP/Pages/PackPriceCov';
import PaimentPICov from '../Containers/Views/CovoiturageP/Pages/PaimentPICov';


//CODE PROMO//
import PCodesTravailleurs from '../Containers/Views/PromosCodes/PCodes.paiment.travailleurs';
import PCodesCovoiturages from '../Containers/Views/PromosCodes/PCodes.paiment.covoiturage';


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

  const [u_dataV, setU_data] = React.useState(null);
  const initialLoginState = {
    isLoading: true,
    u_data: null,
    userToken:null
  }


  

React.useEffect(() => {
Pusher.logToConsole = false;

var pusher = new Pusher('e4ad133537d71dc9e689', {
  cluster: 'mt1'
});

var channel = pusher.subscribe('FlexCars');
channel.bind(u_dataV?.u_data?.accountType == "Passagers" ? "Passagers" : "Conducteur", function(data) {
  console.log(JSON.stringify(data));
  if(data?.id == u_dataV?.u_data?.id){
    sendNotif(data);
  }
 });

},[]);


//console.log(datapusher[0]?.id);

/* ========= NOTIFICATIONS ====== */
  React.useEffect(() => {
  PushNotification.createChannel(
      {
        channelId: u_dataV?.u_data?.accountType == "Passagers" ? "Passagers" : "Conducteur" , // (required)
        channelName: u_dataV?.u_data?.accountType == "Passagers" ? "Passagers" : "Conducteur" , // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );

PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});
},[])
function sendNotif(data){
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: u_dataV?.u_data?.accountType == "Passagers" ? "Passagers" : "Conducteur" , // (required) channelId, if the channel doesn't exist, notification will not trigger.
      showWhen: true, // (optional) default: true
      autoCancel: false, // (optional) default: true
      color: "green", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 100, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      priority: "high", // (optional) set notification priority, default: high
      visibility: "private", // (optional) set notification visibility, default: private
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
      shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
      timeoutAfter: 10000, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

      actions: ["OK" /*, "No" */], // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      /* iOS only properties */
      subtitle: "My Notification Subtitle", // (optional) smaller title below notification title

      /* iOS and Android properties */
      id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: "FlexCar", // (optional)
      message: data?.messages, // (required)
      playSound: true, // (optional) default: true
      soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      repeatType: null, // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    });
  
}

/* ======= END ====== */



  const loginReducer = (prevState , action ) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGIN':
        return {
          ...prevState,
          userData: action.id,
          isLoading: false,
        }
      case 'LOGOUT':
        return {
          ...prevState,
          userData: null,
          userToken: null,
          isLoading: false,
        }
      case 'REGISTER':
        return {
          ...prevState,
          userData: action.id,
          userToken: action.token,
          isLoading: false,
        }
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(
      () => ({
         signIn: async (userData, password) => {
            let userToken;
            userData = "hdhdhd";
            try {
               const jsonValue = userData;
               await AsyncStorage.setItem("@u_data", jsonValue);
               await AsyncStorage.setItem("@isNewsCov", "1");
               await AsyncStorage.setItem("@isNewsTav", "1");
            } catch (e) {
              console.log("SignIp", userData, password);
            }

            setU_data(userData);
            dispatch({ type: "LOGIN", id: userData, token: userToken });
            console.log("Login");
         },
         signOut: async (data) => {
            try {
               const value = await AsyncStorage.removeItem("@u_data");
                                    AsyncStorage.setItem("AlreadyLog",JSON.stringify(data))
            } catch (e) {
               console.log("SignUp");
            }
            dispatch({ type: "LOGOUT" });
         },
         signUp: async (userData, password) => {
            let userToken;
            userToken = "hdhoz";
            try {
               //const jsonValue = userData;
               await AsyncStorage.setItem("@u_data", JSON.stringify(userData));
               await AsyncStorage.setItem("@isNewsCov", "1");
               await AsyncStorage.setItem("@isNewsTav", "1");

            } catch (e) {

            }
            setU_data(userData);
            dispatch({ type: "REGISTER", id: userData, token: userToken });
            //console.log("SignUp", userData, password);
         },
      }),
      []
   );

   React.useEffect(() => {
      setTimeout(async () => {
         try {
            const value = await AsyncStorage.getItem("@u_data");
            if (value !== null) {
               // value previously stored
               setU_data(JSON.parse(value));
                console.log(JSON.parse(value)?.status);
               dispatch({ type: "REGISTER", token: "mmllk" });
            }else{
              setU_data([]);
              dispatch({ type: "LOGOUT" });
            }
         } catch (e) { 
            console.log(e);
         }

      }, 1000);
      //alert('ok');
   }, []);

   if(loginState?.isLoading){
     console.log(loginState)
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
        <ActivityIndicator size="large"/>
      </View>
      )
   }

   requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.FACE_ID]).then((statuses) => {
     if(statuses[PERMISSIONS.IOS.CAMERA] == "blocked" ){
      Alert.alert('Messages ', 'Vous devez autoriser l\' accès à la camera ', [
        
        {
          text: 'Activer',
          onPress: () => {
            openSettings().catch(() => console.warn('cannot open settings'));

          },
        },
      ])
     }
    console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
  }).catch(() => console.log("non"));
    return (
      <AuthContext.Provider value={authContext} ref={navigationRef}>
        {loginState?.userToken === null ? <MainNavigatorAuth /> : 
        <Drawer.Navigator 
        drawerContent={props => <Menu data={u_dataV} {...props} />}
        initialRouteName="Accueil" 
        screenOptions={{
          drawerStyle: {
          backgroundColor: 'white',
          },
          headerShown: false,
          swipeEdgeWidth: 0
        }}>
        <Drawer.Screen name="Index" component={Index} initialParams={{ typeC: 'Conducteur', u_dataV : u_dataV , timestamp : new Date().getTime() }} />
        <Drawer.Screen name="FindDrivers" component={FindDrivers} />
        <Drawer.Screen name="ResultDrivers" component={ResultDrivers} />
        <Drawer.Screen name="Paiement" component={Paiement} />
        <Drawer.Screen name="RideStart" component={RideStart} />
        
        <Drawer.Screen name="PaymentMethode" component={PaymentMethode} />
        <Drawer.Screen name="PaymentConfirmation" component={PaymentConfirmation} />
        <Drawer.Screen name="Securite" component={Securite} />
        <Drawer.Screen name="DetailSecurite" component={DetailSecurite} />
        <Drawer.Screen name="Historique" component={Historique} />
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        

        <Drawer.Screen name="PolitiqueConf" component={PolitiqueConf} />

        <Drawer.Screen name="PCodesTravailleurs" component={PCodesTravailleurs} />
        <Drawer.Screen name="PCodesCovoiturages" component={PCodesCovoiturages} />
        


        <Drawer.Screen name="FindDriversT" component={FindDriversT} />
        <Drawer.Screen name="ResultDriversT" component={ResultDriversT} />
        <Drawer.Screen name="PaiementT" component={PaiementT} />
        <Drawer.Screen name="RideStartT" component={RideStartT} />

        <Drawer.Screen name="IndexP" component={IndexP} />
        <Drawer.Screen name="Courses" component={Courses} />
        <Drawer.Screen name="PackPrice" component={PackPrice} />
        <Drawer.Screen name="PaimentPI" component={PaimentPI} />


        <Drawer.Screen name="NAlert" component={NAlert} />
        <Drawer.Screen name="CoursesDetails" component={CoursesDetails} />
        <Drawer.Screen name="CoursesStart" component={CoursesStart} />
        <Drawer.Screen name="CoursesEnd" component={CoursesEnd} />


        <Drawer.Screen name="IndexPT" component={IndexPT} />
        <Drawer.Screen name="CoursesT" component={CoursesT} />
        <Drawer.Screen name="PackPriceT" component={PackPriceT} />
        <Drawer.Screen name="PaimentPIT" component={PaimentPIT} />


        <Drawer.Screen name="NAlertT" component={NAlertT} />
        <Drawer.Screen name="CoursesDetailsT" component={CoursesDetailsT} />
        <Drawer.Screen name="CoursesStartT" component={CoursesStartT} />
        <Drawer.Screen name="CoursesEndT" component={CoursesEndT} />


        

        <Drawer.Screen name="AccueilCovoiturage" component={AccueilCovoiturage} />
        <Drawer.Screen name="FetchDriversCovoiturage" component={FetchDriversCovoiturage} />
        <Drawer.Screen name="CourseStart" component={CourseStart} />

        
        <Drawer.Screen name="AccueilCovoiturageP" component={AccueilCovoiturageP} />
        <Drawer.Screen name="RaceCourseStart" component={RaceCourseStart} />
        <Drawer.Screen name="RaceStartFindCustomers" component={RaceStartFindCustomers} />
        <Drawer.Screen name="RaceInPending" component={RaceInPending} />
        <Drawer.Screen name="PackChooseCov" component={PackChooseCov} />
        <Drawer.Screen name="PackPriceCov" component={PackPriceCov} />
        <Drawer.Screen name="PaimentPICov" component={PaimentPICov} />



        

    </Drawer.Navigator>
        }
        
      </AuthContext.Provider>
      
    )
  
}

export default MainNavigator
