/**
 * Sample React Native IndexP
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

//My Src Import
import Colors from '../../../Utils/Colors.js';
import Iconsimg from '../../../Utils/Img';
import Fr from '../../../Utils/Fr';
import Generalstyle from '../../../Utils/GeneralStyle';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const IndexPT: () => Node = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === '#3DB24B';

  const backgroundStyle = {
    backgroundColor: '#3DB24B',
    width: windowWidth,
    height: windowHeight,
  };
  const {u_data , timestamp,price}=route.params;

  const [modalVisible, setModalVisible] = React.useState(false);
  const [count, setcount] = React.useState(120);
  
  const dataPrice = [
    {
      id: 1,
      name: 'Court trajet',
      price: '10.000',
      color: '#053706',
    },
    {
      id: 2,
      name: 'Long trajet',
      price: '12.000',
      color: '#FFCD06',
    },
  ];
  return (
    <View style={[{height: windowHeight, flex: 1}]}>
      <View
        style={[
          Colors.Green_BG,
          {
            height: windowHeight / 7,
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
          {Fr.Tav}
        </Text>
        <Image source={Iconsimg.icon_travailleur} style={[Generalstyle.DefaultImg,{
            width:50,
            height:50,
            resizeMode:'contain'
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
          onPress={() => navigation.navigate('PackPriceT',{ u_data: u_data, timestamp: timestamp, PackagePrice:item})}
            style={{
              marginTop: 20,
              backgroundColor: item.color,
              height: windowHeight / 4,
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
                  style={{ textAlign: 'right', color: 'white', fontSize: 150 }}>
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
    </View>
  );
};

export default IndexPT;
