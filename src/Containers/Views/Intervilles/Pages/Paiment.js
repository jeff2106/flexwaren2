/**
 * Sample React Native Paiement
 * https://github.com/facebook/react-native
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
  TextInput,
  FlatList,
  Linking,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import Icons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';


//My Src Import
import Colors from '../../../Utils/Colors.js';
import Iconsimg from '../../../Utils/Img';
import Fr from '../../../Utils/Fr';
import Generalstyle from '../../../Utils/GeneralStyle';
import Header from '../../../Components/Header';
import CardDrivers from '../../../Components/CardDrivers';
import Drivers from '../../../DemoData/DriversData.js';
import Pusher from 'pusher-js/react-native';

import Footer from '../../../Components/Footer';
//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const Paiement: () => Node = ({navigation, route}) => {
  //Data of Color
  const isDarkMode = useColorScheme() === '#3DB24B';
  const {methodName, u_data, data2 ,timestamp} = route.params;


  const backgroundStyle = {
    backgroundColor: '#3DB24B',
  };
  //end
  //List Of my variable declared
  const [modalVisible3, setModalVisible3] = React.useState(false);
  const [paymentIsOk, setPaymentIsOk] = React.useState(false);


  const [AfterFilterDataReturn, setAfterFilterDataReturn] = React.useState();
  const [Warn, setWarn] = React.useState();
  const [Reservation, setReservation] = React.useState();
  //End

  Pusher.logToConsole = false;

  var pusher = new Pusher('e4ad133537d71dc9e689', {
    cluster: 'mt1'
  });

  var channel = pusher.subscribe('Intervilles');
  channel.bind('PaymentInterville', function(data) {

    //alert(JSON.stringify(data));
    if(data?.iDCustomers ==  u_data?.id){
    setModalVisible3(!modalVisible3);
    }

  });

  /* === Notifications ====*/
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1,backgroundColor:'white'}}>
        <Header />
        <WebView
        style={{flex: 1}}
        source={{ uri:`https://prumad.com/API/cinetpay-PaymentInterville.php?amout=${data2?.price}&idUser=${u_data?.id}&idRace=${data2?.id}&idDrives=${data2?.DriverData?.id}&methodPayment=MobileMoney&state=succes&raceType=PackagePrice&timestamp=${timestamp}` }} />
        <Text/>
        <Text/>

        <TouchableOpacity
            onPress={() => {
              navigation.navigate('ResultDrivers',{
              u_data: u_data , WAY: '',WAYG: '',timestamp: new Date().getTime()
              })
            }}
            style={{height:40,borderRadius:20,alignSelf:'center',width:'80%',backgroundColor:'#3DB24B',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'white',fontWeight:'bold'}}>Annuler le payment</Text>
        </TouchableOpacity>

        <Text/>
        <Text/>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible3}
        >
        <View
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
                  fontSize: 15,
                  fontStyle: 'italic',
                  textTransform: 'uppercase',
                  marginTop: 10,
                },
              ]}>
              {Fr.RRS}
            </Text>
            <TouchableOpacity onPress={() => {

          navigation.navigate('ResultDrivers',{
          u_data: u_data , WAY: '',WAYG: '',timestamp: new Date().getTime()
          })
        }} style={{marginTop: 10,alignSelf:'center',backgroundColor:'#3DB24B',height:50,alignItems:'center',justifyContent:'center',width:windowWidth/1.5,borderRadius:50}}>
              <Text style={{color:'white'}}>{Fr.BackAccueil}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Paiement;
