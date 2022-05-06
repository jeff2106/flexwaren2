/**
 * Sample React Native PaiementT
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

const PaiementT: () => Node = ({navigation, route}) => {
  //Data of Color
  const isDarkMode = useColorScheme() === '#3DB24B';
  const {methodName, u_data, data2 ,timestamp} = route.params;
  console.log(data2);
  const backgroundStyle = {
    backgroundColor: '#3DB24B',
  };
  //end
  //List Of my variable declared
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisible2, setModalVisible2] = React.useState(false);
  const [modalVisible3, setModalVisible3] = React.useState(false);
  
  const [AfterFilterDataReturn, setAfterFilterDataReturn] = React.useState();
  const [Warn, setWarn] = React.useState();
  const [Reservation, setReservation] = React.useState();
  //End

 
  //Function for call driver since tel
  const onSendSMSMessage = React.useCallback(async (phoneNumber, message) => {
    const separator = Platform.OS === 'ios' ? '&' : '?';
    //const url = `sms:0797977977${separator}body=kkkhkgkugggjjhg`;
    const url = `tel:${data2?.tel}`;
    await Linking.openURL(url);
  }, []);
  //End

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'#3DB24B'} />
      <View style={{flex: 1}}>
        <Header  title={'travailleurs'}/>
        {methodName == 'Mtn' && (
          <View>
            <Image
              source={Iconsimg.sys_img_mtn}
              style={[
                {
                  width: 100,
                  resizeMode: 'contain',
                  marginTop: 30,
                },
                Generalstyle.alignSelf,
              ]}
            />
            <Text style={{color: 'black', textAlign: 'center', opacity: 0.5}}>
              {Fr.DDN}
            </Text>
            <Text style={{color: 'black', textAlign: 'center'}}>
              (+225) {data2?.DriverData?.number}
            </Text>
            <Text
              style={{
                color: '#3DB24B',
                textAlign: 'center',
                fontSize: 30,
                marginTop: 30,
                marginBottom: 30,
                fontWeight: 'bold',
              }}>
              {data2?.price}XOF
            </Text>
            
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 5,
                marginRight: 5,
              }}>
              <Text style={{color: 'black', textAlign: 'center'}}>
                {Fr.MTOP}
              </Text>
              <Text style={{color: '#3DB24B', textAlign: 'center'}}>
                {data2?.price}XOF
              </Text>
            </View>
            <TouchableOpacity onPress={() => {
          var formdata = new FormData();
              formdata.append("idRaces", data2?.id);
              formdata.append("idCustomers", u_data?.id);
              formdata.append("methodPayment", methodName);
              formdata.append("state", "succes");
              formdata.append("raceType", "travailleurs");
              formdata.append("price", data2?.price);

              var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
              };

              fetch("https://prumad.com/API/?insertRaceAdd", requestOptions)
                .then(response => response.json())
                .then(result => {
                  console.log(result);
                  if(result?.status == 406){
                    Alert.alert('Message', "Plus de place disponible !!!");
                    navigation.navigate('ResultDrivers',{
                    u_data: u_data , WAY: '',WAYG: '',timestamp: new Date().getTime()
                    })
                  }else if (result?.status == 405){
                    Alert.alert('Message', "Erreur à la reservation!!!")
                    navigation.navigate('ResultDrivers',{
                    u_data: u_data , WAY: '',WAYG: '',timestamp: new Date().getTime()
                    })
                  }else{
                    setModalVisible3(!modalVisible3);
                  }
                })
                .catch(error => console.log('error', error));
        }} style={{marginTop: 100,alignSelf:'center',backgroundColor:'#3DB24B',height:50,alignItems:'center',justifyContent:'center',width:'80%',borderRadius:50}}>
              <Text style={{color:'white'}}>CONFIRMER</Text>
            </TouchableOpacity>
          </View>
        )}
        {methodName == 'Moov' && (
          <View>
            <Image
              source={Iconsimg.sys_img_moov}
              style={[
                {
                  width: 100,
                  resizeMode: 'contain',
                  marginTop: 30,
                },
                Generalstyle.alignSelf,
              ]}
            />
            
            <Text style={{color: 'black', textAlign: 'center', opacity: 0.5}}>
              {Fr.DDN}
            </Text>
            <Text style={{color: 'black', textAlign: 'center'}}>
              (+225) {data2?.DriverData?.number}
            </Text>
            <Text
              style={{
                color: '#3DB24B',
                textAlign: 'center',
                fontSize: 30,
                marginTop: 30,
                marginBottom: 30,
                fontWeight: 'bold',
              }}>
              {data2?.price}XOF
            </Text>
            
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 5,
                marginRight: 5,
              }}>
              <Text style={{color: 'black', textAlign: 'center'}}>
                {Fr.MTOP}
              </Text>
              <Text style={{color: '#3DB24B', textAlign: 'center'}}>
                {data2?.price}XOF
              </Text>
            </View>
            <TouchableOpacity onPress={() => {
          var formdata = new FormData();
              formdata.append("idRaces", data2?.id);
              formdata.append("idCustomers", u_data?.id);
              formdata.append("methodPayment", methodName);
              formdata.append("state", "succes");
              formdata.append("raceType", "travailleurs");
              formdata.append("price", data2?.price);

              var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
              };

              fetch("https://prumad.com/API/?insertRaceAdd", requestOptions)
                .then(response => response.json())
                .then(result => {
                  console.log(result);
                  if(result?.status == 406){
                    Alert.alert('Message', "Plus de place disponible !!!");
                    navigation.navigate('ResultDrivers',{
                    u_data: u_data , WAY: '',WAYG: '',timestamp: new Date().getTime()
                    })
                  }else if (result?.status == 405){
                    Alert.alert('Message', "Erreur à la reservation!!!")
                    navigation.navigate('ResultDrivers',{
                    u_data: u_data , WAY: '',WAYG: '',timestamp: new Date().getTime()
                    })
                  }else{
                    setModalVisible3(!modalVisible3);
                  }
                })
                .catch(error => console.log('error', error));
        }} style={{marginTop: 100,alignSelf:'center',backgroundColor:'#3DB24B',height:50,alignItems:'center',justifyContent:'center',width:'80%',borderRadius:50}}>
              <Text style={{color:'white'}}>CONFIRMER</Text>
            </TouchableOpacity>
          </View>
        )}
        {methodName == 'Orange' && (
          <View>
            <Image
              source={Iconsimg.sys_img_orangeMoney}
              style={[
                {
                  width: 100,
                  resizeMode: 'contain',
                  marginRight: 5,
                },
                Generalstyle.alignSelf,
              ]}
            />
            
            <Text style={{color: 'black', textAlign: 'center', opacity: 0.5}}>
              {Fr.DDN}
            </Text>
            <Text style={{color: 'black', textAlign: 'center'}}>
              (+225) {data2?.DriverData?.number}
            </Text>
            <Text
              style={{
                color: '#3DB24B',
                textAlign: 'center',
                fontSize: 30,
                marginTop: 30,
                marginBottom: 30,
                fontWeight: 'bold',
              }}>
              {data2?.price}XOF
            </Text>
            
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 5,
                marginRight: 5,
              }}>
              <Text style={{color: 'black', textAlign: 'center'}}>
                {Fr.MTOP}
              </Text>
              <Text style={{color: '#3DB24B', textAlign: 'center'}}>
                {data2?.price}XOF
              </Text>
            </View>
            <TouchableOpacity onPress={() => {
          var formdata = new FormData();
              formdata.append("idRaces", data2?.id);
              formdata.append("idCustomers", u_data?.id);
              formdata.append("methodPayment", methodName);
              formdata.append("state", "succes");
              formdata.append("raceType", "travailleurs");
              formdata.append("price", data2?.price);

              var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
              };

              fetch("https://prumad.com/API/?insertRaceAdd", requestOptions)
                .then(response => response.json())
                .then(result => {
                  console.log(result);
                  if(result?.status == 406){
                    Alert.alert('Message', "Plus de place disponible !!!");
                    navigation.navigate('ResultDrivers',{
                    u_data: u_data , WAY: '',WAYG: '',timestamp: new Date().getTime()
                    })
                  }else if (result?.status == 405){
                    Alert.alert('Message', "Erreur à la reservation!!!")
                    navigation.navigate('ResultDrivers',{
                    u_data: u_data , WAY: '',WAYG: '',timestamp: new Date().getTime()
                    })
                  }else{
                    setModalVisible3(!modalVisible3);
                  }
                })
                .catch(error => console.log('error', error));
        }} style={{marginTop: 100,alignSelf:'center',backgroundColor:'#3DB24B',height:50,alignItems:'center',justifyContent:'center',width:'80%',borderRadius:50}}>
              <Text style={{color:'white'}}>CONFIRMER</Text>
            </TouchableOpacity>
          </View>
        )}
        {methodName == 'Wave' && (
          <View>
            <Image
              source={Iconsimg.sys_img_wave}
              style={[
                {
                  width: 100,
                  resizeMode: 'contain',
                  marginRight: 5,
                },
                Generalstyle.alignSelf,
              ]}
            />
            
            <Text style={{color: 'black', textAlign: 'center', opacity: 0.5}}>
              {Fr.DDN}
            </Text>
            <Text style={{color: 'black', textAlign: 'center'}}>
              (+225) {data2?.DriverData?.number}
            </Text>
            <Text
              style={{
                color: '#3DB24B',
                textAlign: 'center',
                fontSize: 30,
                marginTop: 30,
                marginBottom: 30,
                fontWeight: 'bold',
              }}>
              {data2?.price}XOF
            </Text>
            
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 5,
                marginRight: 5,
              }}>
              <Text style={{color: 'black', textAlign: 'center'}}>
                {Fr.MTOP}
              </Text>
              <Text style={{color: '#3DB24B', textAlign: 'center'}}>
                {data2?.price}XOF
              </Text>
            </View>
            <TouchableOpacity onPress={() => {
          var formdata = new FormData();
              formdata.append("idRaces", data2?.id);
              formdata.append("idCustomers", u_data?.id);
              formdata.append("methodPayment", methodName);
              formdata.append("state", "succes");
              formdata.append("raceType", "travailleurs");
              formdata.append("price", data2?.price);

              var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
              };

              fetch("https://prumad.com/API/?insertRaceAdd", requestOptions)
                .then(response => response.json())
                .then(result => {
                  console.log(result);
                  if(result?.status == 406){
                    Alert.alert('Message', "Plus de place disponible !!!");
                    navigation.navigate('ResultDrivers',{
                    u_data: u_data , WAY: '',WAYG: '',timestamp: new Date().getTime()
                    })
                  }else if (result?.status == 405){
                    Alert.alert('Message', "Erreur à la reservation!!!")
                    navigation.navigate('ResultDrivers',{
                    u_data: u_data , WAY: '',WAYG: '',timestamp: new Date().getTime()
                    })
                  }else{
                    setModalVisible3(!modalVisible3);
                  }
                })
                .catch(error => console.log('error', error));
        }} style={{marginTop: 100,alignSelf:'center',backgroundColor:'#3DB24B',height:50,alignItems:'center',justifyContent:'center',width:'80%',borderRadius:50}}>
              <Text style={{color:'white'}}>CONFIRMER</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(!modalVisible3);
          /*
          var formdata = new FormData();
              formdata.append("idRaces", data2?.id);
              formdata.append("idCustomers", u_data?.id);
              formdata.append("methodPayment", methodName);
              formdata.append("state", "succes");
              formdata.append("raceType", "travailleurs");
              formdata.append("price", data2?.price);

              var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
              };

              fetch("https://prumad.com/API/?insertRaceAdd", requestOptions)
                .then(response => response.json())
                .then(result => {
                  console.log(result);
                  if(result?.status == 406){
                    Alert.alert('Message', "Plus de place disponible !!!");
                    navigation.navigate('ResultDrivers',{
                    u_data: u_data , WAY: '',WAYG: '',timestamp: new Date().getTime()
                    })
                  }else if (result?.status == 405){
                    Alert.alert('Message', "Erreur à la reservation!!!")
                    navigation.navigate('ResultDrivers',{
                    u_data: u_data , WAY: '',WAYG: '',timestamp: new Date().getTime()
                    })
                  }else{
                    setModalVisible3(!modalVisible3);
                  }
                })
                .catch(error => console.log('error', error));
          */
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
          navigation.navigate('ResultDriversT',{
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

export default PaiementT;
