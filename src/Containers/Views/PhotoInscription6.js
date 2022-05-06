/**
 * Sample React Native PhotoInscription6
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
import Colors from '../Utils/Colors.js';
import Iconsimg from '../Utils/Img';
import Fr from '../Utils/Fr';
import Generalstyle from '../Utils/GeneralStyle';

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//End

const PhotoInscription6: () => Node = ({navigation, route}) => {

  const { data, typeC } = route.params;

  const [modalVisible, setModalVisible] = React.useState(false);
  const [count, setcount] = React.useState(120);
  
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
          {Fr.TP}
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
        <Text
          style={[
            {
              fontSize: 15,
              color: '#3DB24B',
              textAlign: 'center',
              fontWeight: 'bold',
              width: 250,
              marginTop: 50,
            },
          ]}>
          {Fr.PEV}{' '}
          <Icons name="checkcircle" size={15} style={[{color: '#3DB24B'}]} />
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CarRegister', {
                  data: data,
                  typeC: typeC,
               })
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
        <Text style={{color: 'white', fontWeight: 'bold'}}>{Fr.PE}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhotoInscription6;
