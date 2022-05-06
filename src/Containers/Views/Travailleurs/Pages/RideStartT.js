/**
 * Sample React Native RideStartT
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

const RideStartT: () => Node = ({navigation, route}) => {
  //Data of Color
  const isDarkMode = useColorScheme() === '#3DB24B';
  const backgroundStyle = {
    backgroundColor: '#3DB24B',
  };
  //end
  const { u_data,MyRideDetails,timestamp}=route.params;
  

  //List Of my variable declared
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisible2, setModalVisible2] = React.useState(false);
  const [modalVisible3, setModalVisible3] = React.useState(false);
  const [DetailsRaces, setDetailsRaces] = React.useState([]);

  //End

  //Time
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  var hoursWork = `${hours}:${minutes}:${seconds}`;
  //End
  React.useEffect(() => 
    {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
          console.log("========>");
      
      fetch(`https://prumad.com/API/index2.php?GETDETAILSRACES=${MyRideDetails[0]?.idRaces}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log("========>");
          console.log(result);
          setDetailsRaces(result);
        })
        .catch(error => console.log('error', error));
    },[]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header  title={'Travailleurs'}/>
        <Text style={{marginTop:10,textAlign:'center',color:'#1E8723',fontWeight:'bold'}}>{DetailsRaces?.whereAreYou} - {DetailsRaces?.whereAreYouGoing}</Text>
          <View style={{alignSelf:'center',borderWidth:1,borderColor:'#707070',borderRadius:12,width:'80%',marginTop:10}}>
          <Text style={{marginTop:10,textAlign:'center',color:'black'}}>En route...</Text>
            <Image
              source={Iconsimg.sys_img_ride1}
              style={[
                {
                  width: '80%',
                  resizeMode: 'contain',
                  marginTop: 30,
                },
                Generalstyle.alignSelf,
              ]}
            />
            
            <Text style={{color: 'black', textAlign: 'center'}}>
              Faites un bon voyage !!!
            </Text>
            <Text style={{color: 'black', marginTop:20,marginLeft:10}}>
              Securité
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginLeft: 5,
                marginRight: 5,
                paddingTop:30
              }}>
              <View>
              
              <TouchableOpacity style={[Generalstyle.shadow,{
                  width:50,
                  justifyContent:'center',
                  alignItems:'center',
                  width:80,
                  height:80,
                  borderRadius:windowHeight
              }]}>
              <Image
              source={Iconsimg.icon_contact_confiance}
              style={[
                {
                  resizeMode: 'contain',
                },
                Generalstyle.alignSelf,
              ]}
            />
              </TouchableOpacity>
                    <Text style={{textAlign:'center',fontSize:12,color:'black'}}>Contact de</Text>
                    <Text style={{textAlign:'center',fontSize:12,color:'black'}}>confiance</Text>
              </View>
              <View>
              <TouchableOpacity style={[Generalstyle.shadow,{
                  width:50,
                  justifyContent:'center',
                  alignItems:'center',
                  width:80,
                  height:80,
                  borderRadius:windowHeight
              }]}>
            <Image
              source={Iconsimg.icon_share_position}
              style={[
                {
                  resizeMode: 'contain',
                },
                Generalstyle.alignSelf,
              ]}
            />
              
              </TouchableOpacity>


              <Text style={{textAlign:'center',fontSize:12}}>Partager ma</Text>
                    <Text style={{textAlign:'center',fontSize:12,color:'black'}}>localisation</Text>
              </View>
              <View>
              <TouchableOpacity style={[Generalstyle.shadow,{
                  width:50,
                  justifyContent:'center',
                  alignItems:'center',
                  width:80,
                  height:80,
                  borderRadius:windowHeight
              }]}>
            <Image
              source={Iconsimg.icon_warn}
              style={[
                {
                  resizeMode: 'contain',
                },
                Generalstyle.alignSelf,
              ]}
            />
              

              </TouchableOpacity>
              <Text style={{textAlign:'center',fontSize:12,color:'black'}}>Numéros</Text>
                    <Text style={{textAlign:'center',fontSize:12,color:'black'}}>d'urgence</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => {
          setModalVisible3(!modalVisible3);
        }} style={{marginTop: 50,alignSelf:'center',backgroundColor:'#3DB24B',height:40,alignItems:'center',justifyContent:'center',width:'80%',borderRadius:50,marginBottom:50}}>
              <Text style={{color:'white'}}>{Fr.RAS}</Text>
            </TouchableOpacity>
          </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(!modalVisible3);
        }}> 
        <View
          style={[Generalstyle.centeredView,{
              backgroundColor:'white',
              elevation:null
          }]}>
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
              {DetailsRaces?.whereAreYou} - {DetailsRaces?.whereAreYouGoing}
            </Text>
          <View style={[Generalstyle.modalView,{
              borderRadius:null,
              width:windowWidth/1.2,
              borderWidth:1,
              borderColor:'#000000',
              borderRadius:12
          }]}>
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
              VOYAGE TERMINÉ
            </Text>
            <Text
              style={[
                Generalstyle.modalText,
                Colors.Dark,
                {
                  fontSize: 12,
                  textTransform: 'uppercase',
                  marginTop: 5
                },
              ]}>
              Vous êtes arrivé(e)
            </Text>
            <Image
              source={Iconsimg.sys_img_flags}
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
            
            <TouchableOpacity onPress={() => {
              var requestOptions = {
                  method:'PUT',
                  redirect:'follow'
                };

                fetch(`https://prumad.com/API/index2.php?CourseStartCustomers=${MyRideDetails[0]?.idRaces}`,requestOptions)
                .then(response => response.text())
                .then(result => {
                  console.log(result)
                  setModalVisible3(!modalVisible3);
                  navigation.navigate('FindDriversT',{u_data:u_data,timestamp:new Date().getTime()});
                })
                .catch(error =>  console.log(error))
          
        }} style={{marginTop: 10,alignSelf:'center',backgroundColor:'#053706',height:50,alignItems:'center',justifyContent:'center',width:windowWidth/1.5,borderRadius:12}}>
              <Text style={{color:'white'}}>Fermer</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RideStartT;
