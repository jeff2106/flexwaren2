/**
 * Sample React Native ResultDrivers
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
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
  TextInput,
  FlatList,
  Linking,
  Alert,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Octicons';
import Icons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Pusher from 'pusher-js/react-native';
import PushNotification from "react-native-push-notification";


//My Src Import
import Colors from '../../../Utils/Colors.js';
import Iconsimg from '../../../Utils/Img';
import Fr from '../../../Utils/Fr';
import Generalstyle from '../../../Utils/GeneralStyle';
import Header from '../../../Components/Header';
import CardDrivers from '../../../Components/CardDrivers';
import Drivers from '../../../DemoData/DriversData.js';
import Footer from '../../../Components/Footer';
//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End
import RideStart from './RideStart';


const ResultDrivers: () => Node = ({navigation, route}) => {
  //Data of Color
  const isDarkMode = useColorScheme() === '#3DB24B';
  const {u_data , WAY,WAYG,timestamp} = route.params;
  const backgroundStyle = {
    backgroundColor: '#3DB24B',
  };
  //end

  //List Of my variable declared
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisible2, setModalVisible2] = React.useState(false);
  const [modalVisible3, setModalVisible3] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(true);
  const [dataSource, setDataSource] = React.useState([]);
  const [datamodalVisible, setDataModalVisible] = React.useState();
  const [AfterFilterDataReturn, setAfterFilterDataReturn] = React.useState();
  const [MyRideIntervilles, setMyRideInterville] = React.useState([]);

  const [Reservation, setReservation] = React.useState();
  const [Title, setTitle] = React.useState(WAYG);
  const [alertData, setAlertData] = React.useState();

  //End

  //Time
    let date = new Date();
    let hoursTimes = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    let seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;
    let DaysTimes = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    let MonthTimes = ( date.getMonth() + 1 ) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    let YearsTimes = `2${date.getYear().toString().replaceAll('1','0')}`;

    let Today = `${YearsTimes}-${MonthTimes}-${DaysTimes}`;

    //End


  function getAlert(){
    

    var myHeaders = new Headers();

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://prumad.com/API/index2.php?AlertAll=${Fr.IntV.toLowerCase()}&currentUserID=${u_data?.id}` , requestOptions)
      .then(response => response.json())
      .then(result => {
        
        console.log('====== reload =====')
        setRefreshing(false);
        setAlertData(result);
      })
      .catch(error => console.log('error', error));
  }
  function filterData(t) {
    var datafilter = alertData?.filter(item => item?.whereAreYouGoing == Title.toLowerCase() && item.state != "End" && item?.date >= Today);
    setAfterFilterDataReturn(datafilter);
    console.log(`05` > 5);
  }
  React.useEffect(() => {
    setRefreshing(!refreshing);
    GetMyRide();
    getAlert();
    filterData(Title);
    console.log('============ reload timestamp ===========');
  }, [Title, timestamp,]);
  //end
const onRefresh = () => {
    //Clear old data of the list
    //Call the Service to get the latest data
    getAlert();
    filterData(Title);
    setRefreshing()
    GetMyRide()
  };
  //Function for call driver since tel
  const onSendSMSMessage = React.useCallback(async (phoneNumber, message) => {
    const separator = Platform.OS === 'ios' ? '&' : '?';
    //const url = `sms:0797977977${separator}body=kkkhkgkugggjjhg`;
    const url = `tel:${datamodalVisible?.tel}`;
    await Linking.openURL(url);
  }, []);
  //End
 
  //Get Event since child component for display on the parent components
  function showModal(data) {
    setDataModalVisible(data);
    setModalVisible(!modalVisible);
  }

  function CourseStart(id){
    var MyRideFetch = MyRideIntervilles?.filter(item => item?.idRaces == id);
    if(MyRideFetch.length > 0){
      sendNotif();
      navigation.navigate('RideStart',{u_data:u_data,MyRideDetails:MyRideFetch,timestamp:new Date().getTime()});
    }
  }

  /* ========= NOTIFICATIONS ====== */
  React.useEffect(() => {
  PushNotification.createChannel(
      {
        channelId: "Passagers" , // (required)
        channelName: "Passagers" , // (required)
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
function sendNotif(){
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: "Passagers", // (required) channelId, if the channel doesn't exist, notification will not trigger.
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
      message: "Votre course viens de commencer", // (required)
      playSound: true, // (optional) default: true
      soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      repeatType: null, // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    });
  
}

Pusher.logToConsole = false;

  var pusher = new Pusher('e4ad133537d71dc9e689', {
    cluster: 'mt1'
  });

  var channel = pusher.subscribe('Intervilles');
  channel.bind('CourseStartInterville', function(data) {
      
      CourseStart(data?.idRaces);
      

  });
  /* === Notifications ====*/
  function GetMyRide(){
      var myHeaders = new Headers();

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

    fetch(`https://prumad.com/API/index2.php?GetMyRideInterville=${u_data?.id}` , requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setMyRideInterville(result);
      })
      .catch(error => console.log('error', error));
  }

  function isOk(data) {
    setReservation(data);
    console.log(data);
  }
  
  //end
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'#3DB24B'} />
      <View style={{flex: 1}}>
        <Header />
        <View
          style={[
            backgroundStyle,
            {
              height: windowHeight / 5,
              borderBottomRadius: 12,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              padding: 10,
            },
          ]}>
          <View
            style={[
              Generalstyle.row,
              Colors.White_BG,
              {
                borderRadius: 10,
                marginTop: 10,
                padding: 5,
              },
            ]}>
            <Icon name="search" size={20} style={[Colors.Gray]} />
            <TextInput
              onChangeText={t => setTitle(t)}
              style={[{marginLeft: 10, height: '100%', width: '100%',color:'black'}]}
              placeholder="Ou allez vous ?"
            />
          </View>
          <View style={[{marginTop: 10}, Generalstyle.alignSelf]}>
            <Text style={[{fontSize: 23}, Colors.White, Generalstyle.bold]}>
              {Title}
            </Text>
          </View>
        </View>

        {AfterFilterDataReturn?.length == 0 && (
          <Text style={{marginTop: windowHeight / 4, textAlign: 'center',color:'black'}}>
            {Fr.NotDriver}
          </Text>
        )}
        
        <FlatList
          data={AfterFilterDataReturn}
          keyExtractor={item => item.id.toString()}
          renderItem={item => (
            <CardDrivers title={Fr.Tav} r={refreshing} UID={u_data} item={item} Func={showModal}  showReservation={isOk} isValid={!Reservation} />
          )}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={Generalstyle.centeredView}>
          <View style={Generalstyle.modalView}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{position: 'absolute', right: 20, top: 20}}>
              <Icons name="close" size={25} style={[Colors.Dark]} />
            </TouchableOpacity>
           
            <Image
              source={{uri: `data:image/jpeg;base64,${datamodalVisible?.DriverData?.photoProfil}`}}
              style={[
                {
                  width: 100,
                  height: 100,
                  resizeMode: 'cover',
                  marginRight: 5,
                  borderWidth:1,
                  borderColor:'black',
                  borderRadius:100
                },
                Generalstyle.alignSelf,
              ]}
            />
            <Text
              style={[
                Generalstyle.modalText,
                Generalstyle.bold,
                Colors.Dark,
                {
                  fontSize: 20,
                  fontStyle: 'italic',
                  textTransform: 'uppercase',
                  marginTop: 10,
                },
              ]}>
              {datamodalVisible?.DriverData?.fullName}
            </Text>
            <Text
              style={[
                Generalstyle.modalText,
                Colors.Dark,
                {marginTop: -10, marginBottom: 3},
              ]}>
              <Icons name="car" size={15} style={[Colors.Dark]} />{' '}
              {datamodalVisible?.DriverData?.carBrand.toUpperCase()}
            </Text>
            <Text style={{fontWeight: 'bold',color:'black'}}>
              {Fr.destination} : {datamodalVisible?.whereAreYouGoing.toUpperCase()}
            </Text>
            <Text style={{fontWeight: 'bold',color:'black'}}>
              Quartier : {datamodalVisible?.districtWAYG.toUpperCase()}
            </Text>
            <Text style={{fontWeight: 'bold',color:'black'}}>
              {Fr.Depart} : {datamodalVisible?.date}
            </Text>
            
            <Text style={{fontWeight: 'bold',color:'black'}}>
              {Fr.Matricule} : {datamodalVisible?.DriverData?.numberMatricles.toUpperCase()}
            </Text>
            <Text style={{fontWeight: 'bold',color:'black'}}>
              {Fr.NbPlace} :{' '}
              {datamodalVisible?.seats -
                datamodalVisible?.seats}
              /{datamodalVisible?.seats}
            </Text>
            <Text style={{fontSize: 15, marginTop: 10,textAlign:'center',color:'red'}}>{Fr.NoSmok}</Text>
            <View
              style={[
                {
                  marginTop: 15,
                  flexDirection: 'row',
                  backgroundColor: null,
                },
              ]}>
              {Reservation == 'Non' ? (
                <TouchableOpacity
                  onPress={() => {
                    setReservation(!Reservation);
                    setModalVisible(!modalVisible);
                    setModalVisible3(!modalVisible3);
                  }}
                  style={[
                    Generalstyle.shadow,
                    {
                      marginTop: 15,
                      width: '45%',
                      marginRight: '5%',
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    },
                    Colors.GreenLignt_BG,
                  ]}>
                  <Text style={{color: 'white'}}>{Fr.Reserver}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    var requestOptions = {
                      method: 'PUT',
                      redirect: 'follow'
                    };

                    fetch(`https://prumad.com/API/?SuppReservation&idRaces=${datamodalVisible?.id}&idCustomers=${u_data?.id}`, requestOptions)
                      .then(response => response.json())
                      .then(result => {
                        if(result?.status == 200){
                          console.log(result);
                          setModalVisible(!modalVisible);
                          setModalVisible2(!modalVisible2);
                         
                        }
                      })
                      .catch(error => console.log('error', error));
                    
                  }}
                  style={[
                    Generalstyle.shadow,
                    {
                      marginTop: 15,
                      width: '45%',
                      marginRight: '5%',
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    },
                    Colors.red_BG,
                  ]}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    {Fr.cancel} {u_data?.u_data?.id}
                  </Text>
                  <Text style={{color: 'white'}}>{Fr.Reserver}</Text>
                </TouchableOpacity>
              )}
              {Reservation == 'Oui' &&
                <TouchableOpacity
                onPress={() => {
                  onSendSMSMessage();
                  setModalVisible(!modalVisible);
                }}
                style={[
                  Generalstyle.shadow,
                  {
                    marginTop: 15,
                    width: '45%',
                    marginLeft: '5%',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  },
                  Colors.darkGreen_BG,
                ]}>
                <Text style={{color: 'white'}}>{Fr.Call_Number}</Text>
                <Text style={{color: 'white', fontSize: 12}}>
                  (225) {datamodalVisible?.DriverData?.number}
                </Text>
              </TouchableOpacity>
              }
              
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}>
        <View
          onPress={() => setModalVisible(!modalVisible)}
          style={Generalstyle.centeredView}>
          <View style={Generalstyle.modalView}>
            <Image
              source={Iconsimg.icon_success}
              style={[
                {
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                  marginRight: 5,
                },
                Generalstyle.alignSelf,
              ]}
            />
            <Text
              style={[
                Generalstyle.modalText,
                Generalstyle.bold,
                Colors.Dark,
                {
                  fontSize: 20,
                  fontStyle: 'italic',
                  textTransform: 'uppercase',
                  marginTop: 10,
                },
              ]}>
              {Fr.cancelTXT}
            </Text>
            <Text
              style={[
                Generalstyle.modalText,
                Colors.Dark,
                {
                  fontSize: 15,
                  fontStyle: 'italic',
                  textTransform: 'uppercase',
                  marginTop: 10,
                  color: 'red',
                },
              ]}>
              {Fr.CancelSsTXT}
            </Text>
            <Text
              style={[
                Generalstyle.modalText,
                Colors.Dark,
                {
                  fontSize: 15,
                  textTransform: 'uppercase',
                  marginTop: 10,
                },
              ]}>
              {Fr.AssT}
            </Text>
            <View
              style={[
                {
                  marginTop: 15,
                  flexDirection: 'row',
                  backgroundColor: null,
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible2(!modalVisible2);
                   navigation.navigate('FindDrivers',{u_data:u_data,timestamp: new Date().getTime()});
                   setTitle(' ');
                }}
                style={[
                  Generalstyle.shadow,
                  {
                    marginTop: 15,
                    width: '90%',
                    marginLeft: '5%',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    alignSelf: 'center',
                  },
                  Colors.GreenLignt_BG,
                ]}>
                <Text style={{color: 'white'}}>{Fr.BackAccueil}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(!modalVisible3);
        }}>
        <View
          onPress={() => setModalVisible(!modalVisible)}
          style={Generalstyle.centeredView}>
          <View style={Generalstyle.modalView}>
            <Image
              source={Iconsimg.icon_alert_danger}
              style={[
                {
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                  marginRight: 5,
                },
                Generalstyle.alignSelf,
              ]}
            />
            <Text
              style={[
                Generalstyle.modalText,
                Generalstyle.bold,
                Colors.Dark,
                {
                  fontSize: 15,
                  fontStyle: 'italic',
                  textTransform: 'uppercase',
                  marginTop: 10,
                  color: 'red',
                },
              ]}>
              {Fr.EEP}
            </Text>
            <TouchableOpacity onPress={() => {
                  navigation.navigate('Paiement', {
                    u_data: u_data,
                    timestamp: new Date().getTime(),
                    data2: datamodalVisible

                  });
                  setModalVisible3(!modalVisible3);
                  
                }}>
                <Text style={{color:'black'}} >PASSER AU PAYMENT </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ResultDrivers;
