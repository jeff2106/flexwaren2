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

const PaimentPICov: () => Node = ({navigation, route}) => {
  //Data of Color
  const isDarkMode = useColorScheme() === '#3DB24B';
  const {title,u_data , timestamp, PackagePrice} = route.params;

  const backgroundStyle = {
    backgroundColor: '#3DB24B',
  };
  //end

  //List Of my variable declared
  const [modalVisible, setModalVisible] = React.useState(false);

  const [modalVisible3, setModalVisible3] = React.useState(false);

  const [Price, setPrice] = React.useState();
  //End

  const today = new Date();
    const yyyy = today.getFullYear();
    let mmD = today.getMonth() +1; // Months start at 0!
    let mmT = today.getMonth() +2; // Months start at 0!

    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mmD < 10) mmD = '0' + mmD;
    if (mmT < 10) mmT = '0' + mmT;

    const EndAbonnement = dd + '/' + mmD + '/' + yyyy;

    const StartAbonnement = dd + '/' + mmT + '/' + yyyy;
  //End
    Pusher.logToConsole = false;

    var pusher = new Pusher('e4ad133537d71dc9e689', {
      cluster: 'mt1'
    });

    var channel = pusher.subscribe('Covoiturage');
    channel.bind('AbonnementCovoiturage', function(data) {

      //alert(JSON.stringify(data));
      if(data?.iDDrivers ==  u_data?.id){
      setModalVisible3(!modalVisible3);
      }

  });

  //Get Event since child component for display on the parent components
  function showModal(data) {
    setDataModalVisible(data);
    setModalVisible(!modalVisible);
  }
  //end
  return (
    <SafeAreaView style={{flex: 1,backgroundColor:'white'}}>
      <View style={{flex: 1}}>
        <Header title='Cov' />
        <View>
          <TextInput 
          placeholder='Montant ici ...' 
          onChangeText={(e) => setPrice(e) } 
          keyboardType="number-pad"
          value={Price} 
          style={{paddingLeft:20,height:50,width:"100%"}} 
          onBlur={() => {
            if(Price < 5000){
              setPrice("5000");
              Alert.alert("Message","Le montant ne peux être inferieur à 5000")
            }
          }}/>
        </View>
        <WebView
        style={{flex: 1,backgroundColor:'white'}}
        source={{ uri:`https://prumad.com/API/cinetpay-abonnementCovoiturage.php?amout=${Price}&idUser=${u_data?.id}&methodPayment=MobileMoney&timestamp=${timestamp}j&dateStart=${StartAbonnement}&dateEnd=${EndAbonnement}` }} />
        <Text/>

        <TouchableOpacity
            onPress={() => {
            navigation.navigate('Index',{
            u_data: u_data ,timestamp: new Date().getTime()
            })
        }}
        style={{height:40,borderRadius:20,alignSelf:'center',width:'80%',backgroundColor:'#3DB24B',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'white',fontWeight:'bold'}}>Annuler le payment</Text>
        </TouchableOpacity>
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
              {Fr.RRS}
            </Text>
            <TouchableOpacity onPress={() => {
          setModalVisible3(!modalVisible3);
          navigation.navigate('Index',{
            u_data: u_data , timestamp: new Date().getTime()
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

export default PaimentPICov;
