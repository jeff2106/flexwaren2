/**
 * Sample React Native Dashboard
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import type { Node } from 'react'
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

//My Src Import
import Colors from '../Utils/Colors.js'
import Generalstyle from '../Utils/GeneralStyle'

//Get Reel Dimension of Screen[]

//End

const Dashboard: () => Node = ({ navigation, route }) => {
  const { u_dataV } = route.params
  const [Amout, setAmount] = React.useState()
  const [RideAccepted, setRideAccepted] = React.useState()
  const [RateAccepted, setRateAccepted] = React.useState()

  React.useEffect(() => {
    let headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    }

    fetch(
      'https://api.prumad.com/_driver/drivermanage_data/CurrentSolde/' +
        u_dataV?.u_data?.id,
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

    var requestOptions2 = {
      method: 'GET',
      redirect: 'follow',
    }

    fetch(
      `https://prumad.com/API/index2.php?RideAverage=${u_dataV?.u_data?.id}`,
      requestOptions2,
    )
      .then(response2 => response2.json())
      .then(result2 => {
        setRideAccepted(result2)
        console.log(result2)
      })
      .catch(error2 => console.log('error2', error2))

    var requestOptions3 = {
      method: 'GET',
      redirect: 'follow',
    }

    fetch(
      `https://prumad.com/API/index2.php?RateAverage=${u_dataV?.u_data?.id}`,
      requestOptions3,
    )
      .then(response3 => response3.json())
      .then(result3 => {
        setRateAccepted(result3)
        console.log(result3)
      })
      .catch(error3 => console.log('error3', error3))
  }, [])

  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Index')}
        style={{ margin: 20 }}
      >
        <Icon size={30} color={Colors.GreenLignt?.color} name="arrowleft" />
      </TouchableOpacity>
      <View style={[{ margin: 20, marginTop: -20 }]}>
        <Image
          source={{
            uri: `data:image/jpeg;base64,${u_dataV?.u_data?.photoProfil}`,
          }}
          style={[
            {
              width: 100,
              height: 100,
              resizeMode: 'cover',
              marginRight: 5,
              borderRadius: 100,
            },
            Generalstyle.alignSelf,
          ]}
        />
        <Text
          style={[
            Generalstyle.alignSelf,
            {
              fontWeight: 'bold',
              fontSize: 20,
              fontStyle: 'italic',
              color: 'black',
            },
          ]}
        >
          {u_dataV?.u_data?.fullName.split(' ')[0]}
        </Text>
        <Text
          style={[
            Generalstyle.alignSelf,
            { fontWeight: 'bold', fontSize: 10, color: 'black' },
          ]}
        >
          (+ 225) {u_dataV?.u_data?.number}
        </Text>
        <View
          style={{
            alignSelf: 'center',
            height: 20,
            width: '120%',
            marginTop: 20,
            backgroundColor: 'gray',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FontAwesome
            size={30}
            color={Colors.GreenLignt?.color}
            name="money"
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              marginLeft: 10,
              fontSize: 16,
            }}
          >
            {Amout?.solde}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            alignSelf: 'center',
            textTransform: 'uppercase',
          }}
        >
          Ajourd'hui{' '}
        </Text>
        <View
          style={{
            alignSelf: 'center',
            height: 1,
            width: '60%',
            marginTop: 5,
            marginBottom: 5,
            backgroundColor: 'gray',
          }}
        />
        <Text style={{ fontSize: 16, alignSelf: 'center' }}>
          {Amout?.nombreCourse} Course{Amout?.nombreCourse > 1 ? 's' : ''}{' '}
          accompli{' '}
        </Text>
        <Text style={{ fontSize: 16, alignSelf: 'center' }}>
          Gain brut:{' '}
          <Text style={{ color: 'black', fontWeight: 'bold' }}>
            {Amout?.solde - (Amout?.solde * 6) / 100} FCFA
          </Text>{' '}
        </Text>
        <View
          style={{
            alignSelf: 'center',
            height: 20,
            width: '120%',
            marginTop: 20,
            backgroundColor: 'gray',
          }}
        />
        <Text />
        <Text style={{ fontSize: 16, alignSelf: 'center' }}>COMMISSIONS</Text>
        <Text />
        <View
          style={{
            alignSelf: 'center',
            height: 1,
            width: '110%',
            marginTop: 5,
            marginBottom: 5,
            backgroundColor: 'gray',
          }}
        />
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16 }}>Commission Flex Warren</Text>
          <Text style={{ textAlign: 'right', color: 'black' }}>
            -{(Amout?.solde * 6) / 100} FCFA
          </Text>
        </View>
        <Text />
        <View
          style={{
            alignSelf: 'center',
            height: 1,
            width: '110%',
            marginTop: 5,
            marginBottom: 5,
            backgroundColor: 'gray',
          }}
        />
        <Text />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16 }}>Solde total :</Text>
          <Text style={{ textAlign: 'right', color: 'black' }}>
            {Amout?.solde}FCFA
          </Text>
        </View>
        <Text />
        <View
          style={{
            alignSelf: 'center',
            height: 20,
            width: '120%',
            marginTop: 5,
            marginBottom: 5,
            backgroundColor: 'gray',
          }}
        />
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              width: '33.33%',
              borderRightWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
            }}
          >
            <FontAwesome
              size={30}
              color={Colors.GreenLignt?.color}
              name="check"
            />
            <Text>{RideAccepted?.number}</Text>
            <Text>Accept??</Text>
          </View>
          <View
            style={{
              width: '33.33%',
              borderRightWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
            }}
          >
            <FontAwesome
              size={30}
              color={Colors.GreenLignt?.color}
              name="star"
            />
            <Text>{(RateAccepted?.number * 5) / 100}%</Text>
            <Text>Notes</Text>
          </View>
          <View
            style={{
              width: '33.33%',
              borderRightWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
            }}
          >
            <FontAwesome
              size={30}
              color={Colors.GreenLignt?.color}
              name="close"
            />
            <Text>{RideAccepted?.numberclose}</Text>
            <Text>Refus??</Text>
          </View>
        </View>
        <View
          style={{
            alignSelf: 'center',
            height: 20,
            width: '120%',
            marginTop: 5,
            marginBottom: 5,
            backgroundColor: 'gray',
          }}
        />
        <Text />
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://prumad.com')
          }}
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <MaterialCommunityIcons
            name="headphones-settings"
            color={Colors.GreenLignt?.color}
            size={25}
          />
          <Text style={{ textAlign: 'right', color: 'black' }}>
            Service d'assistance{' '}
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            color={Colors.GreenLignt?.color}
            size={30}
          />
        </TouchableOpacity>
        <Text />
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('tel:0757595959')
          }}
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <FontAwesome5
            name="users-cog"
            color={Colors.GreenLignt?.color}
            size={25}
          />
          <Text style={{ textAlign: 'right', color: 'black' }}>
            A props de nous{' '}
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            color={Colors.GreenLignt?.color}
            size={30}
          />
        </TouchableOpacity>
        <Text />
      </View>
    </ScrollView>
  )
}

export default Dashboard
