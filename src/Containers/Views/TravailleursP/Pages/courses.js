/**
 * Sample React Native Courses
 * https://github.com/facebo{Fr.VV}/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'


import CardDrivers2 from '../../../Components/CardDrivers2.js'
import Header from '../../../Components/Header';

import Drivers from '../../../DemoData/DriversData2';

//My Src Import
import Colors from '../../../Utils/Colors.js';
import Iconsimg from '../../../Utils/Img';
import Fr from '../../../Utils/Fr';
import Generalstyle from '../../../Utils/GeneralStyle';
import PushNotification from "react-native-push-notification";
import Pusher from 'pusher-js/react-native';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const CoursesT: () => Node = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === '#3DB24B';
  const { u_data,timestamp } = route.params;

  const backgroundStyle = {
    backgroundColor: '#3DB24B',
    width: windowWidth,
    height: windowHeight,
  };
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [Drivers, setDrivers] = React.useState();
  const [refreshing, setRefreshing] = React.useState(true);
  const [MyAbonnment, setMyAbonnment] = React.useState();



  /* ========= NOTIFICATIONS ====== */
  React.useEffect(() => {
  PushNotification.createChannel(
      {
        channelId: "Conducteur" , // (required)
        channelName: "Conducteur" , // (required)
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
        channelId: "Conducteur" , // (required) channelId, if the channel doesn't exist, notification will not trigger.
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
        title: "Flex Waren", // (optional)
        message: "Vous avez une nouvelle reservation-Travailleurs", // (required)
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        repeatType: null, // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
      });

  }

  Pusher.logToConsole = false;

  var pusher = new Pusher('e4ad133537d71dc9e689', {
    cluster: 'mt1'
  });

  var channel = pusher.subscribe('Travailleurs');
  channel.bind('NewBooking', function(data) {
    if(data?.iDDrivers == u_data?.id){

      sendNotif();

    }


  });
    /* ======= END ====== */

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const todays = dd + '/' + mm + '/' + yyyy;

  function getAlert(){
          var myHeaders = new Headers();

          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

      fetch(`https://prumad.com/API/?AlertAllCourseDrivers=${Fr.Tav.toLowerCase()}&idDrivers=${u_data?.id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setDrivers(result);
          setIsLoading(false);
        })
        .catch(error => console.log('error', error));
  }

  function getMyAbonnment(){
    var requestOptions2 = {
          method: 'GET',
          redirect: 'follow'
        };

      fetch(`https://prumad.com/API/index2.php?MonAbonnementTravailleurs=${u_data?.id}`, requestOptions2)
        .then(response2 => response2.json())
        .then(result2 =>{ setMyAbonnment(result2);console.log(result2);})
        .catch(error2 => console.log('error2', error2));
    }
    React.useEffect(() => {
      setIsLoading(true)
      setDrivers([])
      getAlert();
      getMyAbonnment();
    },[timestamp]);


  return (
    <View style={[{height: windowHeight, flex: 1}]}>
      <View
        style={[
          Colors.Green_BG,
          {
            height: windowHeight / 8,
            alignItems: 'center',
            flexDirection:'row',
          },
        ]}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon name="menu" size={20} style={[Colors.White,{marginRight:windowHeight/7,marginLeft:10}]} />
        </TouchableOpacity>
        <View>
        <Text
          style={[
            {
              color: 'white',
              fontSize: 15,
              fontWeight: 'bold',
              textAlign:'center'
            },
          ]}>
          {Fr.Tav}
        </Text>
        <Image source={Iconsimg.icon_interville} style={[Generalstyle.DefaultImg,{
            width:90,
        }]} />
        </View>
      </View>
        <View style={[{height:70,justifyContent:'center',alignItems:'center',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,},Colors.GreenLignt_BG]}>
            <Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Mes alertes</Text>
        </View>

        <View style={{height:20}}/>

        <ScrollView style={{flex:1}}>
      {
        isLoading == false &&
        Drivers?.length < 1 &&
        <View style={{justifyContent:'center',alignItems:'center',marginTop:40}}>
          <Image source={Iconsimg.sys_emptyAlert} style={[Generalstyle.DefaultImg,{
              width:90,
          }]} />
          {MyAbonnment?.status == 404 ?
            <TouchableOpacity onPress={() => navigation.navigate('IndexPT',{u_data : u_data,AbonnementPrice:MyAbonnment?.price,timestamp:timestamp})} style={[Colors.GreenLignt_BG,{width:'50%',justifyContent:'center',alignItems:'center',height:50,borderRadius:20}]}>
                  <Text style={[Generalstyle.bold,Colors.White]}>Créer une alerte</Text>
            </TouchableOpacity> :
            <TouchableOpacity onPress={() => navigation.navigate('NAlertT',{u_data : u_data,AbonnementPrice:MyAbonnment?.price,timestamp:timestamp})} style={[Colors.GreenLignt_BG,{width:'50%',justifyContent:'center',alignItems:'center',height:50,borderRadius:20}]}>
                  <Text style={[Generalstyle.bold,Colors.White]}>Créer une alerte</Text>
            </TouchableOpacity>
          }

        </View>
      }

      {
        isLoading && <ActivityIndicator size="large"/>
      }
      {Drivers?.map((i,k) => <TouchableOpacity onPress={() => {navigation.navigate('CoursesDetailsT',{DDetails: i,u_data: u_data,timestamp:new Date().getTime()})}} key={k} style={[]}>
        <CardDrivers2  item={i} />
        </TouchableOpacity>)}
        <View style={{height:50}}/>
      </ScrollView>

    <View style={{height:20,borderBottom:1}}/>
      {
        Drivers?.length > 0 && <View style={[{
          height:70,
          width:'100%',
          alignSelf:'center',
          justifyContent:'space-around',
          alignItems:'center',
          flexDirection:'row',
          position:'absolute',
          bottom:0
      },Colors.darkGreen_BG]}>
      {
                MyAbonnment?.messages == "Vous n'avez pas d'abonnement" &&
                <TouchableOpacity onPress={() => navigation.navigate('IndexPT',{u_data : u_data,AbonnementPrice:MyAbonnment?.price,timestamp: new Date().getTime()})} style={[Colors.GreenLignt_BG,{width:'50%',justifyContent:'center',alignItems:'center',height:50,borderRadius:20}]}>
                        <Text style={[Generalstyle.bold,Colors.White]}>Créer une alerte</Text>
                </TouchableOpacity>
              }

              {
                MyAbonnment?.status != 404 &&
                <TouchableOpacity onPress={() => navigation.navigate(MyAbonnment?.dateEnd > todays ? 'NAlertT' : 'IndexPT' ,{u_data : u_data,AbonnementPrice:MyAbonnment?.price, timestamp: new Date().getTime()})} style={[Colors.GreenLignt_BG,{width:'50%',justifyContent:'center',alignItems:'center',height:50,borderRadius:20}]}>
                        <Text style={[Generalstyle.bold,Colors.White]}>Créer une alerte</Text>
                </TouchableOpacity>
              }
      </View>
      }
    </View>
  );
};

export default CoursesT;
