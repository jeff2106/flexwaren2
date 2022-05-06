/**
 * Sample React Native NAlert
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
  Alert,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

//My Src Import
import Colors from '../../../Utils/Colors.js';
import Iconsimg from '../../../Utils/Img';
import Fr from '../../../Utils/Fr';
import Generalstyle from '../../../Utils/GeneralStyle';
import {Picker} from '@react-native-picker/picker'; 

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const NAlert: () => Node = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === '#3DB24B';
  const { u_data , timestamp } = route.params;

  const backgroundStyle = {
    backgroundColor: '#3DB24B',
    width: windowWidth,
    height: windowHeight,
  };
  const [modalVisible, setModalVisible] = React.useState(false);
  const [whereAreYou, setWhereAreYou] = React.useState("");
  const [districtWAY, setDistrictWAY] = React.useState("");
  const [whereAreYouGoing, setWhereAreYouGoing] = React.useState("");
  const [districtWAYG, setDistrictWAYG] = React.useState("");
  const [seats, setSeats] = React.useState("");
  const [price, setPrice] = React.useState("");

  const [dateTimesAlert, setDateTimesAlert] = React.useState("");
  const [dateTimesHoursAlert, setDateTimesHoursAlert] = React.useState("");



  const VP = [
    {
      id:1,
      ville:'bouake',
      price: 5500
    },
    {
      id:2,
      ville:'yamoussoukro',
      price: 3700
    },
    {
      id:3,
      ville:'issia',
      price: 4500
    },
    {
      id:4,
      ville:'gagnoa',
      price: 3100
    },
    {
      id:5,
      ville:'korogho',
      price: 7500
    },
    {
      id:6,
      ville:'daloa',
      price: 5600
    },
    {
      id:7,
      ville:'divo',
      price: 2701
    },
    {
      id:8,
      ville:'adzopé',
      price:1701 
    },
    {
      id:9,
      ville:'aboisso',
      price: 1700
    },
    {
      id:10,
      ville:'bonoua',
      price: 1702
    },
    {
      id:11,
      ville:'dabou',
      price: 800 
    },
    {
      id:12,
      ville:'toumodi',
      price: 2700 
    },
    {
      id:13,
      ville:'abengourou',
      price: 2500 
    },
    {
      id:14,
      ville:'grand lahou',
      price: 1500 
    }
  ]

   let whereAreYouGoingG = VP?.filter((t,k) => {
      if(k == whereAreYouGoing){
        return t
      }
    })

  //Time
  let date = new Date();
  let DaysTimes = date.getDate();
  let MonthTimes = date.getMonth();
  let YearsTimes = `2${date.getYear().toString().replaceAll('1','0')}`;
  //End

  function sendNewAlert(){
    
    var formdata = new FormData();
    formdata.append("idDrivers", u_data?.id);
    formdata.append("districtWAYG", districtWAYG?.toLowerCase());
    formdata.append("whereAreYouGoing", whereAreYouGoingG[0]?.ville?.toLowerCase());
    formdata.append("districtWAY", districtWAY?.toLowerCase());
    formdata.append("whereAreYou", whereAreYou?.toLowerCase());
    formdata.append("seats", seats);
    formdata.append("IDusersReserve", 0);
    formdata.append("hours",  dateTimesHoursAlert);
    formdata.append("date", dateTimesAlert);
    formdata.append("price", price);
    formdata.append("totalPrice", '');
    formdata.append("state", "in progress");
    formdata.append("raceType", Fr.IntV);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://prumad.com/API/?insertNewAlert", requestOptions)
    .then(response => response.json())
    .then(result => {
      //console.log(result);
      Alert.alert('Message',"Votre alerte viens d'etre créer ");
      navigation.navigate('Courses',{u_data: u_data,timestamp: new Date().getTime()});
    })
    .catch(error => console.log('error', error));
     
  }

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {

    setDateTimesAlert(JSON.stringify(date).replaceAll('\"','').split('T')[0]);
    setDateTimesHoursAlert(JSON.stringify(date).replaceAll('\"','').split('T')[1].split('.')[0]);
    console.warn("A date has been picked: ", date);

    hideDatePicker();
  };


  return (
    <View style={[{height: windowHeight, flex: 1}]}>
      <ScrollView style={[{height: windowHeight}]}>
        <View
          style={[
            Colors.darkGreen_BG,
            {
              height: windowHeight / 10,
              alignItems: 'center',
              padding: 10,
              flexDirection: 'row',
            },
          ]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={35} style={[{color: 'white'}]} />
          </TouchableOpacity>
          <Text
            style={[
              {
                color: 'white',
                fontSize: 20,
                marginLeft: 20,
                fontWeight: 'bold',
                paddingLeft: 10,
              },
            ]}>
            {Fr.IntV}
          </Text>
        </View>
        <Text
          style={{
            color: '#3DB24B',
            marginTop: 20,
            marginLeft: 15,
            marginBottom: 20,
            fontSize:18,
            fontWeight:'bold'
          }}>
          Créer une alerte
        </Text>
        <View style={{margin: 5}}>
          <Text style={{marginLeft: 10, color: '#3DB24B', marginBottom: 10}}>
            Où êtes-vous ? 
          </Text>
          <TextInput
            onChangeText={(val) => setWhereAreYou(val)}
            style={[
              {
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                fontSize: 20,
                width: windowWidth / 1.1,
                height:50,
                fontWeight: 'bold',
                paddingLeft: 10
                ,color:'black'
              },
            ]}
          />
        </View>
        <View style={{margin: 5}}>
          <Text style={{marginLeft: 10, color: '#3DB24B', marginBottom: 10}}>
            Le quartier ? 
          </Text>
          <TextInput
            onChangeText={(val) => setDistrictWAY(val)}
            style={[
              { 
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                fontSize: 20,
                width: windowWidth / 1.1,
                height:50,
                fontWeight: 'bold'
                ,color:'black',
                paddingLeft: 10,
              },
            ]}
          />
        </View>
        <View style={{margin: 5}}>
          <Text style={{marginLeft: 10, color: '#3DB24B', marginBottom: 10}}>
            Où allez-vous ?
          </Text>
          <Picker
             style={[
              {
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                fontSize: 20,
                width: windowWidth / 1.1,
                fontWeight: 'bold',
                paddingLeft: 10
                ,color:'black',
                overflow:'hidden'
              },
            ]}
              selectedValue={price}

              onValueChange={(itemValue, itemIndex) =>
               {
               setPrice(itemValue) 
               setWhereAreYouGoing(itemIndex);
               console.log(itemValue,itemIndex);
             }
              }>
              {
               VP?.map((i,k) => 
              <Picker.Item key={k} label={i?.ville} value={i?.price} />
               ) 
              }
            </Picker>
          
        </View>
        <View style={{margin: 5}}>
          <Text style={{marginLeft: 10, color: '#3DB24B', marginBottom: 10}}>
            Le quartier ? 
          </Text>
          <TextInput
            onChangeText={(val) => setDistrictWAYG(val)}
            style={[
              {
                alignSelf: 'center',
                backgroundColor: 'white'
                ,color:'black',
                borderRadius: 20,
                fontSize: 20,
                width: windowWidth / 1.1,
                height:50,
                fontWeight: 'bold',
                paddingLeft: 10,
              },
            ]}
          />
        </View>
        <View style={{margin: 5}}>
          <Text style={{marginLeft: 10, color: '#3DB24B', marginBottom: 10}}>
            Combien de place disposez-vous ?
          </Text>
          <TextInput
            onChangeText={(val) => setSeats(val)}
            keyboardType={"number-pad"}
            style={[
              {
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                fontSize: 20,
                width: windowWidth / 1.1,
                height:50,
                fontWeight: 'bold'
                ,color:'black',
                paddingLeft: 10,
              },
            ]}
          />
        </View>
        <View style={{margin: 5}}>
          <Text style={{marginLeft: 10, color: '#3DB24B', marginBottom: 10}}>
            Date et heures
          </Text>
          <TouchableOpacity onPress={showDatePicker} 
            style={[
                  {
                    alignSelf: 'center',
                    backgroundColor: 'white'
                    ,color:'black',
                    fontSize: 15,
                    width: '100%',
                    height:50,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center'
                  },
                ]}>
              <Text>
                { dateTimesAlert } --- {dateTimesHoursAlert}
              </Text>
            </TouchableOpacity>
          
        </View>
        <View style={{height: 10}} />
        <DateTimePickerModal
          minimumDate={new Date(YearsTimes, MonthTimes, DaysTimes)}
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View>
        {
          districtWAY != "" && 
          whereAreYouGoing != "" && 
          districtWAYG != "" && 
          seats != "" &&
          price != "" &&
          dateTimesAlert != "" ?
          <TouchableOpacity
            onPress={() => sendNewAlert()}
            style={[
              {
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                borderRadius: 30,
                width: '50%',
                alignSelf: 'center',
              },
              Colors.GreenLignt_BG,
            ]}>
            <Text style={{color:'white',fontWeight:'bold'}}>CONFIRMER</Text>
          </TouchableOpacity> :

          <TouchableOpacity
            style={[
              {
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                borderRadius: 30,
                width: '50%',
                alignSelf: 'center',
                backgroundColor:'gray'
              }
            ]}>
            <Text style={{color:'white',fontWeight:'bold'}}>CONFIRMER</Text>
          </TouchableOpacity>

        }
          
        </View>
      </ScrollView>
    </View>
  );
};

export default NAlert;
