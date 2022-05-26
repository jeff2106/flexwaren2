/**
 * Sample React Native FirstView
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
  ImageBackground,
  TextInput,
  Alert
} from 'react-native';
import ImagePicker from "react-native-image-crop-picker";
import ImgToBase64 from 'react-native-image-base64-png';
import NotificationSounds, { playSampleSound } from  'react-native-notification-sounds';
import AsyncStorage from '@react-native-async-storage/async-storage';

//My Src Import
import Colors from '../Utils/Colors.js';
import Iconsimg from '../Utils/Img';
import Fr from '../Utils/Fr';
import Generalstyle from '../Utils/GeneralStyle';
import Pusher from 'pusher-js/react-native';
import PushNotification from "react-native-push-notification";
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import PushNotificationIOS from '../js';
import { AuthContext } from '../Components/context';



//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//End


/* === Notifications ====*/




const FirstView: () => Node = ({navigation}) => {
  const isDarkMode = useColorScheme() === '#3DB24B';
  const { signIn, signUp,signOut } = React.useContext(AuthContext);

  const backgroundStyle = {
    backgroundColor: '#3DB24B',
    width: windowWidth,
    height: windowHeight,
  };

  const [modalVisible, setModalVisible] = React.useState(false);
  const [hasAlreadyConnectState, sethasAlreadyConnectState] = React.useState("");


/* === Notifications ====*/
async function hasAlreadyConnect(){
    try {
        const value =  await AsyncStorage.getItem("AlreadyLog");

        sethasAlreadyConnectState(JSON.parse(value))
        //console.log('ok',value)
     } catch (e) { 
        console.log(e);
     }
}

React.useEffect(() => {
    hasAlreadyConnect()
},[])

  return (

      <SafeAreaView style={{flex:1}}>

          <ImageBackground
              style={[
                  {resizeMode: 'contain', height: windowHeight},
                  Colors.darkGreen_BG,
              ]}
              source={Iconsimg.backGroundImageAppp}>
              <Image source={Iconsimg.sys_imgFlex} style={{resizeMode:'contain',height:200,width:200,alignSelf:'center'}}/>
              <View style={{position: 'absolute', bottom: '7%', left: 0, right: 0}}>
                  <TouchableOpacity
                      onPress={() => navigation.navigate('PolitiqueConf')}
                      style={[
                          {
                              height: windowHeight / 15,
                              width: '90%',
                              alignSelf: 'center',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginBottom: 25,
                              borderRadius: 20,
                          },
                          Colors.GreenLignt_BG,
                      ]}>
                      <Text
                          style={[
                              {fontWeight: 'bold', textTransform: 'uppercase', color: 'white'},
                          ]}>
                          {Fr.Ins}
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() =>  /* NmberVerifL1 sendLocalNotificationWithSound() */  { hasAlreadyConnectState?.status !== 200 ? navigation.navigate('NmberVerifL1') :  setModalVisible(true)}}
                      
                      style={[
                          {
                              height: windowHeight / 15,
                              width: '90%',
                              alignSelf: 'center',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 20,
                              marginBottom: 50,
                          },
                          Colors.White_BG,
                      ]}>
                      <Text
                          style={[
                              Colors.GreenLignt,
                              {fontWeight: 'bold', textTransform: 'uppercase'},
                          ]}>
                          {Fr.LogTxt}
                      </Text>
                  </TouchableOpacity>
              </View>
          </ImageBackground>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}
        >
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.centeredView}/>
            <View style={styles.modalView}>
                <Text style={[styles.modalText,{color:Colors.darkGreen_BG.backgroundColor ,fontSize:20,fontWeight:'bold'}]}>Est-ce votre compte ?</Text>
                <View>
                    <View>
                        <Image style={[styles?.rounder]} source={{uri: `data:image/jpeg;base64,${hasAlreadyConnectState?.u_data?.photoProfil}`}} />
                    </View>
                    <Text style={[styles.modalText,{color:Colors.darkGreen_BG.backgroundColor ,fontSize:20,fontWeight:'bold'}]}>{hasAlreadyConnectState?.u_data?.fullName}</Text>
                </View>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {setModalVisible(!modalVisible);signUp(hasAlreadyConnectState,"password")}}
                >
                <Text style={styles.textStyle}>Oui</Text>
                </Pressable>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {setModalVisible(!modalVisible);navigation.navigate('NmberVerifL1');}}
                >
                <Text style={styles.textStyle}>Non</Text>
                </Pressable>
            </View>
        </Modal>
      </SafeAreaView>

  );
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      height: windowHeight /2,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      width: '80%'
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: Colors.darkGreen_BG.backgroundColor,
      marginBottom:10
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    rounder:{
        height:100,
        width:100,
        alignSelf:'center',
        borderRadius:100,
        margin:10
    },

  });

export default FirstView;
