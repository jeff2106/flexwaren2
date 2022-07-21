/**
 * Sample React Native Index
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef, useState } from 'react'
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
  ActivityIndicator,
  Animated,
} from 'react-native'
import NetInfo from '@react-native-community/netinfo'
//My Src Import
import Colors from '../Utils/Colors.js'
import Iconsimg from '../Utils/Img'
import Fr from '../Utils/Fr'
import Generalstyle from '../Utils/GeneralStyle'
import { AuthContext } from '../Components/context'
import Geolocation from '@react-native-community/geolocation'

const Index: () => Node = ({ navigation, route }) => {
  const isDarkMode = useColorScheme() === '#3DB24B'
  const backgroundStyle = {
    backgroundColor: '#3DB24B',
    flex: 1,
  }
  const { u_dataV, timestamp } = route.params
  const [modalVisible, setModalVisible] = React.useState(false)
  const [u_data, setdata] = React.useState(u_dataV)
  const [Amount, setAmount] = React.useState('')
  const { signOut } = React.useContext(AuthContext)
  const initialState = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.120864195044303443,
    longitudeDelta: 0.1220142817690068,
  }
  const [curentPosition, setCurentPosition] = React.useState(initialState)

  React.useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      const { longitude, latitude } = info.coords
      coord(longitude, latitude)
      setCurentPosition({
        ...curentPosition,
        latitude,
        longitude,
      })
    })
  }, [curentPosition.latitude, timestamp])

  function coord(lng, lat) {
    let headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    }

    let bodyContent = JSON.stringify({
      uid: u_data?.u_data.id,
      lat: lng,
      lng: lat,
    })

    fetch('https://api.prumad.com/_driver/drivermanage_data/usercoords/', {
      method: 'POST',
      body: bodyContent,
      headers: headersList,
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        console.log(data)
      })
  }

  //Time
  let date = new Date()
  let hours = date.getHours()
  //End

  React.useEffect(() => {
    if (u_data?.u_data?.accountType == Fr.C) {
      let headersList = {
        Accept: '*/*',
        'Content-Type': 'application/json',
      }

      fetch(
        'https://api.prumad.com/_driver/drivermanage_data/CurrentSolde/' +
          u_data?.u_data?.id,
        {
          method: 'GET',
          headers: headersList,
        },
      )
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          setAmount(data)
        })
    }
  }, [timestamp, u_data?.u_data?.accountType, u_data?.u_data?.id])

  const btn = [
    {
      id: 1,
      routes: 'FindDrivers',
      firstView: 'FindDrivers',
      text: Fr.IntV,
      img: Iconsimg.icon_interville,
    },
    {
      id: 2,
      routes: 'AccueilCovoiturage',
      firstView: 'AccueilCovoiturage',
      text: Fr.Cov,
      img: Iconsimg.icon_covoiturage,
    },
    {
      id: 3,
      routes: 'FindDriversT',
      firstView: 'FindDriversT',
      text: Fr.Tav,
      img: Iconsimg.icon_travailleur,
    },
  ]

  const btn2 = [
    {
      id: 1,
      routes: 'Courses',
      firstView: 'Courses',
      text: Fr.IntV,
      img: Iconsimg.icon_interville,
    },
    {
      id: 2,
      routes: 'AccueilCovoiturageP',
      firstView: 'AccueilCovoiturageP',
      text: Fr.Cov,
      img: Iconsimg.icon_covoiturage,
    },
    {
      id: 3,
      routes: 'CoursesT',
      firstView: 'CoursesT',
      text: Fr.Tav,
      img: Iconsimg.icon_travailleur,
    },
  ]
  if (u_data?.u_data?.accountType == Fr.C && Amount == '') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  return (
    <SafeAreaView style={[backgroundStyle]}>
      <View style={[Generalstyle.miniCard, { marginTop: 30 }]}>
        <Text
          style={[Generalstyle.miniText, Generalstyle.alignSelf, Colors.Green]}
        >
          {Fr.ChooseSys}
        </Text>
        <Text style={[{ fontSize: 12 }, Generalstyle.alignSelf, Colors.Green]}>
          Espace de {u_data?.u_data?.accountType}
        </Text>
        {u_data?.u_data?.accountType == 'Conducteur' &&
          btn2.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={[Generalstyle.miniCardBtn]}
                onPress={() => {
                  if (item.text == 'Travailleurs') {
                    if (hours > 13 && hours < 21) {
                      navigation.navigate(`${item.firstView}`, {
                        u_data: u_data?.u_data,
                        timestamp: new Date().getTime(),
                        Amount: Amount,
                      })
                    } else if (hours > 4 && hours < 12) {
                      navigation.navigate(`${item.firstView}`, {
                        u_data: u_data?.u_data,
                        timestamp: new Date().getTime(),
                        Amount: Amount,
                      })
                    } else {
                      setModalVisible(!modalVisible)
                    }
                  }
                  if (item.text != 'Travailleurs') {
                    navigation.navigate(`${item.firstView}`, {
                      u_data: u_data?.u_data,
                      timestamp: new Date().getTime(),
                      Amount: Amount,
                    })
                  }
                }}
              >
                <Image source={item.img} style={[Generalstyle.DefaultImg]} />
              </TouchableOpacity>
              <Text
                style={[
                  Generalstyle.alignSelf,
                  Generalstyle.bold,
                  { color: 'black' },
                ]}
              >
                {item.text}
              </Text>
            </View>
          ))}

        {u_data?.u_data?.accountType === 'Passagers' &&
          btn.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={[Generalstyle.miniCardBtn]}
                onPress={() => {
                  if (item.text === 'Travailleurs') {
                    if (hours > 15 && hours < 21) {
                      navigation.navigate(`${item.firstView}`, {
                        u_data: u_data?.u_data,
                        timestamp: new Date().getTime(),
                        Amount: Amount,
                      })
                    } else if (hours > 4 && hours < 8) {
                      navigation.navigate(`${item.firstView}`, {
                        u_data: u_data?.u_data,
                        timestamp: new Date().getTime(),
                        Amount: Amount,
                      })
                    } else {
                      setModalVisible(!modalVisible)
                    }
                  }
                  if (item.text != 'Travailleurs') {
                    navigation.navigate(`${item.firstView}`, {
                      u_data: u_data?.u_data,
                      timestamp: new Date().getTime(),
                      Amount: Amount,
                    })
                  }
                }}
              >
                <Image source={item.img} style={[Generalstyle.DefaultImg]} />
              </TouchableOpacity>
              <Text
                style={[
                  Generalstyle.alignSelf,
                  Generalstyle.bold,
                  { color: 'black' },
                ]}
              >
                {item.text}
              </Text>
            </View>
          ))}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={Generalstyle.centeredView}
        >
          <View style={Generalstyle.modalView}>
            <Image
              source={Iconsimg.icon_travailleur}
              style={[
                Generalstyle.DefaultImg,
                { resizeMode: 'contain', width: 100 },
              ]}
            />
            <Text
              style={[Generalstyle.modalText, Generalstyle.bold, Colors.red]}
            >
              {Fr.warnTextIntV}
            </Text>
            <Text style={[Generalstyle.modalText, Colors.red]}>{Fr.Mn}</Text>
            <Text
              style={[Generalstyle.modalText, Generalstyle.bold, Colors.red]}
            >
              05h à 08h
            </Text>
            <Text style={[Generalstyle.modalText, Colors.red]}>{Fr.Sr}</Text>
            <Text
              style={[Generalstyle.modalText, Generalstyle.bold, Colors.red]}
            >
              16h à 20h
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )
}

export default Index
