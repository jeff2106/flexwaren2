/**
 * Sample React Native NAlertT
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
import Icon from 'react-native-vector-icons/Ionicons'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

//My Src Import
import Colors from '../../../Utils/Colors.js'
import Iconsimg from '../../../Utils/Img'
import Fr from '../../../Utils/Fr'
import Generalstyle from '../../../Utils/GeneralStyle'

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
//End

const NAlertT: () => Node = ({ navigation, route }) => {
  const isDarkMode = useColorScheme() === '#3DB24B'
  const { u_data, timestamp } = route.params

  const backgroundStyle = {
    backgroundColor: '#3DB24B',
    width: windowWidth,
    height: windowHeight,
  }

  const [modalVisible, setModalVisible] = React.useState(false)
  const [whereAreYou, setWhereAreYou] = React.useState('')
  const [districtWAY, setDistrictWAY] = React.useState('')
  const [whereAreYouGoing, setWhereAreYouGoing] = React.useState('')
  const [districtWAYG, setDistrictWAYG] = React.useState('')
  const [seats, setSeats] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false)
  const [dateTimesAlert, setDateTimesAlert] = React.useState('')
  const [dateTimesHoursAlert, setDateTimesHoursAlert] = React.useState('')

  //Time
  let date = new Date()
  let DaysTimes = date.getDate()
  let MonthTimes = date.getMonth()
  let YearsTimes = `2${date.getYear().toString().replaceAll('1', '0')}`
  //End

  function sendNewAlert() {
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
      'Content-Type': 'application/json',
    }

    let bodyContent = JSON.stringify({
      idDrivers: u_data?.id,
      districtWAYG: districtWAYG.toLowerCase(),
      whereAreYouGoing: whereAreYouGoing.toLowerCase(),
      districtWAY: districtWAY.toLowerCase(),
      whereAreYou: whereAreYou.toLowerCase(),
      seats: seats,
      IDusersReserve: 0,
      hours: dateTimesHoursAlert,
      date: dateTimesAlert,
      price: price,
      totalPrice: 0,
      state: 'in progress',
      raceType: Fr.Tav,
      seatsAvailable: 0,
    })

    fetch('https://api.prumad.com/_race/Race_intervilles_travailleurs/', {
      method: 'POST',
      body: bodyContent,
      headers: headersList,
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (result) {
        console.log(result)
        Alert.alert('Message', "Votre alerte viens d'etre créer ")
        navigation.navigate('CoursesT', {
          u_data: u_data,
          timestamp: new Date().getTime(),
        })
      })
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = date => {
    setDateTimesAlert(JSON.stringify(date).replaceAll('"', '').split('T')[0])
    setDateTimesHoursAlert(
      JSON.stringify(date).replaceAll('"', '').split('T')[1].split('.')[0],
    )
    console.warn('A date has been picked: ', date)

    hideDatePicker()
  }

  return (
    <View style={[{ height: windowHeight, flex: 1 }]}>
      <ScrollView style={[{ height: windowHeight }]}>
        <View
          style={[
            Colors.darkGreen_BG,
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
            {Fr.Tav}
          </Text>
        </View>
        <Text
          style={{
            color: '#3DB24B',
            marginTop: 20,
            marginLeft: 15,
            marginBottom: 20,
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Créer une alerte
        </Text>
        <View style={{ margin: 5 }}>
          <Text style={{ marginLeft: 10, color: '#3DB24B', marginBottom: 10 }}>
            Où êtes-vous ?
          </Text>
          <TextInput
            onChangeText={val => setWhereAreYou(val)}
            style={[
              {
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                fontSize: 15,
                width: windowWidth / 1.1,
                height: 50,
                paddingLeft: 10,
              },
            ]}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Text style={{ marginLeft: 10, color: '#3DB24B', marginBottom: 10 }}>
            Le quartier ?
          </Text>
          <TextInput
            onChangeText={val => setDistrictWAY(val)}
            style={[
              {
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                fontSize: 15,
                width: windowWidth / 1.1,
                height: 50,
                paddingLeft: 10,
              },
            ]}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Text style={{ marginLeft: 10, color: '#3DB24B', marginBottom: 10 }}>
            Où allez-vous ?
          </Text>
          <TextInput
            onChangeText={val => setWhereAreYouGoing(val)}
            style={[
              {
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                fontSize: 15,
                width: windowWidth / 1.1,
                height: 50,
                paddingLeft: 10,
              },
            ]}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Text style={{ marginLeft: 10, color: '#3DB24B', marginBottom: 10 }}>
            Le quartier ?
          </Text>
          <TextInput
            onChangeText={val => setDistrictWAYG(val)}
            style={[
              {
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                fontSize: 15,
                width: windowWidth / 1.1,
                height: 50,
                paddingLeft: 10,
              },
            ]}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Text style={{ marginLeft: 10, color: '#3DB24B', marginBottom: 10 }}>
            Le prix
          </Text>
          <TextInput
            keyboardType={'number-pad'}
            onChangeText={val => setPrice(val)}
            style={[
              {
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                fontSize: 15,
                width: windowWidth / 1.1,
                height: 50,
                paddingLeft: 10,
              },
            ]}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Text style={{ marginLeft: 10, color: '#3DB24B', marginBottom: 10 }}>
            Combien de place disposez-vous ?
          </Text>
          <TextInput
            keyboardType={'number-pad'}
            onChangeText={val => setSeats(val)}
            style={[
              {
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                fontSize: 15,
                width: windowWidth / 1.1,
                height: 50,
                paddingLeft: 10,
              },
            ]}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Text style={{ marginLeft: 10, color: '#3DB24B', marginBottom: 10 }}>
            Date et heures
          </Text>
          <TouchableOpacity
            onPress={showDatePicker}
            style={[
              {
                alignSelf: 'center',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                fontSize: 15,
                width: windowWidth / 1.1,
                height: 50,
                paddingLeft: 10,
              },
            ]}
          >
            <Text>
              {dateTimesAlert} --- {dateTimesHoursAlert}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 10 }} />
        <DateTimePickerModal
          minimumDate={new Date(YearsTimes, MonthTimes, DaysTimes)}
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View>
          {whereAreYou != '' &&
          districtWAY != '' &&
          whereAreYouGoing != '' &&
          districtWAYG != '' &&
          seats != '' &&
          price != '' &&
          dateTimesAlert != '' ? (
            <TouchableOpacity
              onPress={() => sendNewAlert()}
              style={[
                {
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                  borderRadius: 30,
                  width: '50%',
                  alignSelf: 'center',
                },
                Colors.GreenLignt_BG,
              ]}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                CONFIRMER
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                {
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                  borderRadius: 30,
                  width: '50%',
                  alignSelf: 'center',
                  backgroundColor: 'gray',
                },
              ]}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                CONFIRMER
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default NAlertT
