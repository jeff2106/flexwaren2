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
} from 'react-native';


//My Src Import
import Colors from '../Utils/Colors.js';
import Iconsimg from '../Utils/Img';
import Fr from '../Utils/Fr';
import Generalstyle from '../Utils/GeneralStyle';
import Pusher from 'pusher-js/react-native';
import PushNotification from "react-native-push-notification";




//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//End



/* === Notifications ====*/




const FirstView: () => Node = ({navigation}) => {
  const isDarkMode = useColorScheme() === '#3DB24B';

  const backgroundStyle = {
    backgroundColor: '#3DB24B',
    width: windowWidth,
    height: windowHeight,
  };

  const [modalVisible, setModalVisible] = React.useState(false);
  const [notification, setNotification] = React.useState(false);



/* === Notifications ====*/
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
                      onPress={() =>  /* NmberVerifL1 */ navigation.navigate('NmberVerifL1')}
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
      </SafeAreaView>

  );
};

export default FirstView;
