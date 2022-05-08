/**
 * Sample React Native PackChooseCov
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'

//My Src Import
import Colors from '../../../Utils/Colors.js';
import Iconsimg from '../../../Utils/Img';
import Fr from '../../../Utils/Fr';
import Generalstyle from '../../../Utils/GeneralStyle';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const PackChooseCov: () => Node = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === '#3DB24B';

  const backgroundStyle = {
    backgroundColor: '#3DB24B',
    width: windowWidth,
    height: windowHeight,
  };
  const [modalVisible, setModalVisible] = React.useState(false);
  const [count, setcount] = React.useState(120);
  const {u_data , timestamp}=route.params;


  const dataPrice = [
    {
      id: 1,
      name: 'STANDARD',
      price: '10.000',
      color: '#053706',
    },
    {
      id: 2,
      name: 'SILVER',
      price: '20.000',
      color: 'gray',
    },{
      id: 3,
      name: 'GOLD',
      price: '30.000',
      color: '#FFCD06',
    },
  ];

  React.useEffect(async () => {
      try {
            const value = await AsyncStorage.getItem("@isNewsCov");
            if (value !== null) {
               if(value == 1){
                setModalVisible(!modalVisible)
               }
            }else{
              console.log("Nothing inside");
            }
         } catch (e) {
            console.log("Nothing inside");
      }
    },[]);

  return (
    <ScrollView style={[{height: windowHeight, flex: 1}]}>
      <View
        style={[
          Colors.Green_BG,
          {
            height: windowHeight / 8,
            alignItems: 'center',
            justifyContent:'center'
          },
        ]}>
        <Text
          style={[
            {
              color: 'white',
              fontSize: 15,
              fontWeight: 'bold',
            },
          ]}>
          {Fr.Cov}
        </Text>
        <Image source={Iconsimg.icon_covoiturage} style={[Generalstyle.DefaultImg,{
            width:40,height:40
        }]} />
      </View>
      <Text/>
      <Text
          style={{
            color: 'red',
            fontSize: 17,
            textAlign: 'center',
            fontWeight: 'bold',
            width:300,
            alignSelf:'center'
          }}>
          Choissez votre formule d'abonnement pour commencer
        </Text>

        {dataPrice.map((item, index) => (
          <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('PackPriceCov',{ u_data: u_data, timestamp: timestamp, PackagePrice:item})}
            style={{
              marginTop: 20,
              backgroundColor: item.color,
              height: windowHeight / 5,
              borderRadius: 10,
              width: windowWidth / 1.05,
              alignSelf: 'center',
              overflow: 'hidden',
            }}>
            <View>
              <View
                style={{
                  backgroundColor: 'white',
                  width: windowWidth / 3,
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontWeight: 'bold', color: '#1E8723' }}>
                  {' '}
                  {item.name}

                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: windowWidth / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{ textAlign: 'right', color: 'white', fontSize: 100 }}>
                  1
                </Text>
                <View>
                <Text
                  style={{ textAlign: 'left', color: 'white', fontSize: 30 }}>
                  {' '}
                  Mois
                </Text>
                <Text
                  style={{ textAlign: 'left', color: 'white', fontSize: 15 }}>
                  {' '}
                  Abonnement
                </Text>
                <Text
                  style={{ textAlign: 'left', color: 'white', fontSize: 15 }}>
                  {' '}
                  {item.name}
                </Text>
                </View>

              </View>
              <View style={{ width: windowWidth / 2.3 }}>
                <Text
                  style={{
                    textAlign: 'right',
                    color: 'white',
                    fontSize: 30,
                    fontWeight: 'bold',
                  }}>
                  {item.price}
                </Text>
                <Text
                  style={{
                    textAlign: 'right',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 30,
                  }}>
                  FCFA
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <Modal
           animationType="slide"
           transparent={true}
           visible={modalVisible}
           onRequestClose={() => {
             Alert.alert("Messages","Vous venez de perdre la promo !");
             setModalVisible(!modalVisible);
           }}
         >
           <View style={Generalstyle.centeredView}>
             <View style={Generalstyle.modalView}>
               <Text style={[Generalstyle.bold,Generalstyle.SIZE_20,Colors.Dark]}>Bienvenue sur Flex Waren</Text>
               <Text/>
               <Text style={[Generalstyle.textAlign_center]}>
                Pour votre première recharge vous aurez un bonus , qui vous donne droit à la la somme payé x10 , supercool n'est ce pas ?. Ce bonus n'est valable qu'à l'instant, cliquez vite ci-dessous pour en profiter !!!
             </Text>
               <Text/>
               <Text/>


             </View>
             <View style={[{flexDirection:'row',height:200}]}>
                  <TouchableOpacity
                    style={[Colors.GreenLignt_BG,{width:100,height:100,marginHorizontal:10,borderRadius:10},Generalstyle.HEIGHT_15,Generalstyle.JSC_ALI_C]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      AsyncStorage.removeItem("@isNewsCov");
                      navigation.navigate('PCodesCovoiturages',{u_data:u_data , timestamp: new Date().getTime()})
                    }}
                    >
                     <Text style={Generalstyle.textStyle}>Profiter</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={[Colors.BG_red,{width:100,height:100,marginHorizontal:10,borderRadius:10},Generalstyle.HEIGHT_15,Generalstyle.JSC_ALI_C]}
                     onPress={() => {
                      setModalVisible(!modalVisible);
                      AsyncStorage.removeItem("@isNewsCov");
                      }}>
                     <Text style={Generalstyle.textStyle}>Fermer</Text>
                  </TouchableOpacity>
              </View>
           </View>
         </Modal>
    </ScrollView>
  );
};

export default PackChooseCov;
