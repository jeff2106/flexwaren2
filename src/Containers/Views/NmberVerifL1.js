/**
 * Sample React Native NmberVerifL1
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
  Alert,
} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import Icon from 'react-native-vector-icons/Ionicons'

//My Src Import
import Colors from '../Utils/Colors.js'
import Fr from '../Utils/Fr'

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
//End

const NmberVerifL1: () => Node = ({ navigation, route }) => {
  const [number, setnumber] = React.useState('')

  const TS = `${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10,
  )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
  //console.log(TS);
  return (
    <View style={[{ height: windowHeight, flex: 1 }]}>
      <ScrollView style={[{ height: windowHeight }]}>
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
                paddingLeft: 10,
              },
            ]}
          >
            {Fr.NmTT}
          </Text>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            color: 'red',
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          {Fr.ITP}
        </Text>
        <View
          style={[
            {
              alignSelf: 'center',
              backgroundColor: 'white',
              paddingLeft: 30,
              borderRadius: 20,
              fontSize: 20,
              width: windowWidth / 1.1,
              fontWeight: 'bold',
              margin: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <Image
            source={require('../Assets/Sys_img/flag.png')}
            style={[{ resizeMode: 'contain', width: 25, height: 25 }]}
          />
          <Text style={{ marginLeft: 12 }}>225</Text>
          <TextInput
            value={number}
            maxLength={14}
            keyboardType={'number-pad'}
            onChangeText={val => setnumber(val)}
            style={[
              {
                color: 'black',
                fontSize: 15,
                width: windowWidth / 1.5,
                fontWeight: 'bold',
                height: 50,
                paddingLeft: 10,
              },
            ]}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: '#3DB24B',
            margin: 20,
          }}
        >
          {Fr.CT}
        </Text>
        <View style={{ height: 10 }} />
        <View>
          <TouchableOpacity
            onPress={() => {
              if (number != '') {
                navigation.navigate('NmberVerifL2', {
                  verification: TS,
                  number: number,
                })
              } else {
                Alert.alert('Alert', 'Vous devez remplir le champs !!!')
              }
            }}
            style={[
              {
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                borderRadius: 40,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#3DB24B',
              },
            ]}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {Fr.next}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default NmberVerifL1
