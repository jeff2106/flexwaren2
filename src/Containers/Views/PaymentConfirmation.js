/**
 * Sample React Native PaymentConfirmation
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
  TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';



//My Src Import
import Colors from '../Utils/Colors.js';
import Iconsimg from '../Utils/Img';
import Fr from '../Utils/Fr';
import Generalstyle from '../Utils/GeneralStyle';
import Header from '../Components/Header';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const PaymentConfirmation: () => Node = ({navigation, route}) => {

  const [ data , setData] = React.useState();


  //console.log(Colors.GreenLignt?.color) 
  return (
    <SafeAreaView style={{flex:1}}>
      <TouchableOpacity onPress={() => navigation.navigate('PaymentMethode')} style={{margin:20}}>
              <Icon size={30} color={Colors.GreenLignt?.color} name="arrowleft" />
      </TouchableOpacity>
      <View style={[{margin:20}]}>
              <Text style={[Generalstyle.bold,{fontSize:20},Generalstyle.alignSelf,Colors.GreenLignt]}>Mode de paiement</Text>

              <Image source={Iconsimg.sysMoneyCov2x} style={{alignSelf:'center',marginTop:10}}/>
              <Text/>
              <Text style={[Generalstyle.bold,{fontSize:20},Generalstyle.alignSelf,Colors.GreenLignt]}>Effectuer le paiement</Text>
              <View style={{flexWrap:'wrap',flexDirection:'row',alignSelf:'center',marginHorizontal:'10%',marginTop:20}}>
                  <TouchableOpacity style={{}}>
              <Image source={Iconsimg.sys_img_moov} style={{alignSelf:'center',marginTop:10,width:125,resizeMode:'contain',height:100}}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{}}>
              <Image source={Iconsimg.sys_img_orangeMoney} style={{alignSelf:'center',marginTop:10,width:125,resizeMode:'contain',height:100}}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{}}>
              <Image source={Iconsimg.sys_img_mtn} style={{alignSelf:'center',marginTop:10,width:125,resizeMode:'contain',height:100}}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{}}>
              <Image source={Iconsimg.sys_img_wave} style={{alignSelf:'center',marginTop:10,width:125,resizeMode:'contain',height:100}}/>
                  </TouchableOpacity>
              </View>
      
      </View>
      <Text/>
      <Text/>
      
      <Text style={{color:'red',width:250,textAlign:'center',alignSelf:'center',fontWeight:'bold',fontSize:17}}>Assurez-vous bien que le contact utilisé pour le paiement par mobile money est bien le votre</Text>
    </SafeAreaView>
  );
};

export default PaymentConfirmation;
