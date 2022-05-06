/**
 * Sample React Native BeforeLastInsertUser
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
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';

//My Src Import
import Colors from '../Utils/Colors.js';
import Iconsimg from '../Utils/Img';
import Fr from '../Utils/Fr';
import Generalstyle from '../Utils/GeneralStyle';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const BeforeLastInsertUser: () => Node = ({navigation, route}) => {

  const { data, typeC } = route.params;

  const [modalVisible, setModalVisible] = React.useState(false);
  const [count, setcount] = React.useState(120);
  const [isLoading, setisLoading] = React.useState(true);



  function insertUser(){

    setisLoading(false);

    if(typeC == Fr.same){
          var myHeaders = new Headers();

          var formData = new FormData();
          formData.append("fullName", data[0]);
          formData.append("email", data[1]);
          formData.append("password", data[2]);
          formData.append("birthDay", data[3]);
          formData.append("region", data[4]);
          formData.append("city", data[5]);
          formData.append("number", data[6]);
          formData.append("photoProfil", data[7]);
          formData.append("accountType", data[8]);
          formData.append("photoDrivingLicense", data[9]);
          formData.append("carBrand", data[10]);
          formData.append("model", data[11]);
          formData.append("year", data[12]);
          formData.append("numberMatricles", data[13]);

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
          };

      fetch("https://prumad.com/API/index2.php?InsertUD", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if(result?.status == 200){
             navigation.navigate('LastViewInsertUser', {
                  u_data: result,
                  typeC: typeC,
                })
           }else{
            Alert.alert('Message',result?.messages)
           }
         
        })
        .catch(error => console.log('error', error));
    }else if (typeC == Fr.P){
          var myHeaders = new Headers();

          var formData = new FormData();
          formData.append("fullName", data[0]);
          formData.append("email", data[1]);
          formData.append("password", data[2]);
          formData.append("birthDay", data[3]);
          formData.append("region", data[4]);
          formData.append("city", data[5]);
          formData.append("number", data[6]);
          formData.append("photoProfil", data[7]);
          formData.append("accountType", data[8]);

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
          };

      fetch("https://prumad.com/API/index2.php?InsertUC", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if(result?.status == 200){
             navigation.navigate('LastViewInsertUser', {
                  u_data: result,
                  typeC: typeC,
                })
           }else{
            Alert.alert('Message',result?.messages)
           }
         
        })
        .catch(error => console.log('error', error));



    }else{
          var myHeaders = new Headers();

          var formData = new FormData();
          formData.append("fullName", data[0]);
          formData.append("email", data[1]);
          formData.append("password", data[2]);
          formData.append("birthDay", data[3]);
          formData.append("region", data[4]);
          formData.append("city", data[5]);
          formData.append("number", data[6]);
          formData.append("photoProfil", data[7]);
          formData.append("accountType", data[8]);
          formData.append("photoDrivingLicense", data[9]);
          formData.append("carBrand", data[10]);
          formData.append("model", data[11]);
          formData.append("year", data[12]);
          formData.append("numberMatricles", data[13]);

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
          };

      fetch("https://prumad.com/API/index2.php?InsertUD", requestOptions)
        .then(response => response.json())
        .then(result => {
           console.log(result);
          if(result?.status == 200){
             navigation.navigate('LastViewInsertUser', {
                  u_data: result,
                  typeC: typeC,
                })
           }else{
            Alert.alert('Message',result?.messages)
           }
         
        })
        .catch(error => console.log('error', error));
    }


  }
  return (
    <View style={[{height: windowHeight, flex: 1}]}>
      <View
        style={[
          Colors.GreenLignt_BG,
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
            },
          ]}>
          {Fr.TIS}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 50,
        }}>
        <Image
          source={{uri: `data:image/jpeg;base64,${data[7]}`}}
          style={[
            {
              resizeMode: 'contain',
              width: windowWidth / 2,
              height: windowHeight / 2.7,
              borderRadius: 200,
            },
          ]}
        />
        <Text style={[{fontSize: 20, marginTop: 20, color: '#3DB24B'}]}>
          {data[0]}
        </Text>
        <Text
          style={[
            {
              fontSize: 15,
              color: '#3DB24B',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            },
          ]}>
          {Fr.PP1.split(' ')[2]}{' '}
          <Icons name="checkcircle" size={15} style={[{color: '#3DB24B'}]} />
        </Text>
        <Text style={[{fontSize: 15, color: '#3DB24B', fontWeight: 'bold'}]}>
          {Fr.PP1}{' '}
          <Icons name="checkcircle" size={15} style={[{color: '#3DB24B'}]} />
        </Text>
        <Text style={[{fontSize: 15, color: '#3DB24B'}]}>
          {typeC}{' '}
          <Icons name="checkcircle" size={15} style={[{color: '#3DB24B'}]} />
        </Text>
        {
          typeC != Fr.P && (
          <View>
            <Text
              style={[
                {
                  fontSize: 15,
                  color: '#3DB24B',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  width: 250,
                },
              ]}>
              {Fr.PEV}{' '}
              <Icons name="checkcircle" size={15} style={[{color: '#3DB24B'}]} />
                </Text>
                <Text
                  style={[
                    {
                      fontSize: 15,
                      color: '#3DB24B',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      width: 250,
                    },
                  ]}>
                  {Fr.TPV}{' '}
                  <Icons name="checkcircle" size={15} style={[{color: '#3DB24B'}]} />
            </Text>
          </View>
          )
        }
        
      </View> 
        <TouchableOpacity
          onPress={() =>
            insertUser()
            
          }
          style={[
            {
              height: 40,
              position: 'absolute',
              bottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
              borderRadius: 40,
              width: windowWidth / 1.2,
              alignSelf: 'center',
              backgroundColor: '#3DB24B',
            },
          ]}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>{Fr.TIS}</Text>
      </TouchableOpacity>
            
    </View>
  );
};

export default BeforeLastInsertUser;
