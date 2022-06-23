/**
 * Sample React Native PhotoInscription2
 * https://github.com/facebo{Fr.VV}/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import type { Node } from 'react'
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
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/AntDesign'
import ImagePicker from 'react-native-image-crop-picker'
import ImgToBase64 from 'react-native-image-base64-png'

//My Src Import
import Colors from '../Utils/Colors.js'
import Iconsimg from '../Utils/Img'
import Fr from '../Utils/Fr'
import Generalstyle from '../Utils/GeneralStyle'

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
//End

const PhotoInscription2: () => Node = ({ navigation, route }) => {
  const { data } = route.params

  const [modalVisible, setModalVisible] = React.useState(false)
  const [count, setcount] = React.useState(120)
  function PickerImg() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        ImgToBase64.getBase64String(image.path)
          .then(base64String => {
            data.push(base64String)
            navigation.navigate('PhotoInscription3', {
              data: data,
            })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }
  function OpenCam() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      ImgToBase64.getBase64String(image.path)
        .then(base64String => {
          data.push(base64String)
          navigation.navigate('PhotoInscription3', {
            data: data,
          })
        })
        .catch(err => console.log(err))
    })
  }

  return (
    <View style={[{ height: windowHeight, flex: 1 }]}>
      <View
        style={[
          Colors.GreenLignt_BG,
          {
            height: windowHeight / 10,
            alignItems: 'center',
            padding: 10,
            flexDirection: 'row',
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={35} style={[{ color: 'white' }]} />
        </TouchableOpacity>
        <Text
          style={[
            {
              color: 'white',
              fontSize: 20,
              marginLeft: 20,
              fontWeight: 'bold',
            },
          ]}
        >
          {Fr.PP1}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 50,
        }}
      >
        <Image
          source={require('../Assets/Sys_img/sys_img_userIcon.png')}
          style={[
            {
              resizeMode: 'contain',
              width: windowWidth / 2,
              height: windowHeight / 4,
            },
          ]}
        />
        <Text style={[{ fontSize: 20, marginTop: 20, color: '#3DB24B' }]}>
          {data[0]}
        </Text>
        <View style={{ height: 34 }} />
        <Text
          style={[
            {
              fontSize: 12,
              color: '#3DB24B',
              textAlign: 'center',
              width: 250,
            },
          ]}
        >
          {Fr.DSP}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => PickerImg()}
        style={[
          {
            height: 50,
            position: 'absolute',
            bottom: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderRadius: 40,
            width: windowWidth / 1.2,
            alignSelf: 'center',
          },
          Colors.darkGreen_BG,
        ]}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{Fr.CP}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => OpenCam()}
        style={[
          {
            height: 50,
            position: 'absolute',
            bottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderRadius: 40,
            width: windowWidth / 1.2,
            alignSelf: 'center',
            backgroundColor: '#3DB24B',
          },
        ]}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{Fr.PP}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PhotoInscription2
