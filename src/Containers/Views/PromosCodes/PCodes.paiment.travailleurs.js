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
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import Icons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';
import Pusher from 'pusher-js/react-native';


//My Src Import
import Colors from '../../Utils/Colors.js';
import Iconsimg from '../../Utils/Img';
import Fr from '../../Utils/Fr';
import Generalstyle from '../../Utils/GeneralStyle';
import Header from '../../Components/Header';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const PCodesTravailleurs: () => Node = ({navigation, route}) => {

  const isDarkMode = useColorScheme() === '#3DB24B';
  const {u_data , timestamp} = route.params;
  const backgroundStyle = {
    backgroundColor: '#3DB24B',
  };

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisible2, setModalVisible2] = React.useState(false);
  const [modalVisible3, setModalVisible3] = React.useState(false);
  const [datamodalVisible, setDataModalVisible] = React.useState();
  const [AfterFilterDataReturn, setAfterFilterDataReturn] = React.useState();
  const [Warn, setWarn] = React.useState();
  const [Reservation, setReservation] = React.useState();

  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  var hoursWork = `${hours}:${minutes}:${seconds}`;

  function showModal(data) {
    setDataModalVisible(data);
    setModalVisible(!modalVisible);
  }
  //end
  const today = new Date();
  const yyyy = today.getFullYear();
  let mmD = today.getMonth() +1;
  let mmT = today.getMonth() +2;

  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mmD < 10) mmD = '0' + mmD;
  if (mmT < 10) mmT = '0' + mmT;

  const EndAbonnement = dd + '/' + mmD + '/' + yyyy;

  const StartAbonnement = dd + '/' + mmT + '/' + yyyy;
    Pusher.logToConsole = false;

    var pusher = new Pusher('e4ad133537d71dc9e689', {
      cluster: 'mt1'
    });

    var channel = pusher.subscribe('Travailleurs');
    channel.bind('AbonnementTravailleurs', function(data) {
      
      //alert(JSON.stringify(data));
      if(data?.iDDrivers ==  u_data?.id){
      setModalVisible3(!modalVisible3);
      }

    });
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'#3DB24B'} />
      <View style={{flex: 1,backgroundColor: 'white'}}>
        <Header title = {'Travailleurs'}/>
        <WebView  
        style={{flex: 1}} 
        source={{ uri:`http://prumad.com/API/cinetpay-promo-travailleurs.php?amout=2000&idUser=${u_data?.id}&methodPayment=MobileMoney&timestamp=${timestamp}&dateStart=${StartAbonnement}&dateEnd=${EndAbonnement}` }} />
        <Text/>
        <Text/>

        <TouchableOpacity 
        onPress={() => {
          navigation.navigate('CoursesT',{
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
        onRequestClose={() => {
          setModalVisible3(!modalVisible3);
        }}>
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
              Votre abonnement PROMO viens d'être mis à jour
            </Text>
            <TouchableOpacity onPress={() => {
          setModalVisible3(!modalVisible3);
          navigation.navigate('CoursesT',{u_data: u_data , timestamp: timestamp,})
        }} style={{marginTop: 10,alignSelf:'center',backgroundColor:'#3DB24B',height:50,alignItems:'center',justifyContent:'center',width:windowWidth/1.5,borderRadius:50}}>
              <Text style={{color:'white'}}>{Fr.BackAccueil}</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PCodesTravailleurs;
