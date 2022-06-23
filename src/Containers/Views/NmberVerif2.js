/**
 * Sample React Native NmberVerif2
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

//My Src Import
import Colors from '../Utils/Colors.js'
import Iconsimg from '../Utils/Img'
import Fr from '../Utils/Fr'
import Generalstyle from '../Utils/GeneralStyle'

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
import { AuthContext } from '../Components/context'

//End

const NmberVerif2: () => Node = ({ navigation, route }) => {
  const [count, setcount] = React.useState(120)
  const [totalDecompte, settotalDecompte] = React.useState(0)
  const [number1, setnumber1] = React.useState(1)
  const [number2, setnumber2] = React.useState(2)
  const [number3, setnumber3] = React.useState(3)
  const [number4, setnumber4] = React.useState(4)

  const { data, verification, number } = route.params
  const { signIn, signUp, signOut } = React.useContext(AuthContext)
  console.log(verification)

  React.useEffect(() => {
    if (count > 0) {
      setTimeout(() => {
        setcount(count - 1)
      }, 1000)
    } else {
      if (totalDecompte < 4) {
        settotalDecompte(totalDecompte + 1)
        setcount(120)
        sendSMS()
      }
    }
  }, [count])
  console.log(number)

  function codeIsValidate() {
    const code = `${number1}${number2}${number3}${number4}`
    if (code == verification) {
      data.push(number)
      navigation.navigate('PhotoInscription1', {
        data: data,
      })
      settotalDecompte(5)
    } else {
      Alert.alert('Messages', 'Vous avez entrer un mauvais code')
    }
  }

  function sendSMS() {
    var myHeaders = new Headers()
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Access-Control-Allow-Origin', '*')
    myHeaders.append(
      'Authorization',
      'Bearer iuTt5G4VV9zLKrZqfqpakr8GDhv2OPsIkFU1N42j',
    )

    var raw = JSON.stringify({
      receivers: [`+225${number.split(' ').join('')}`],
      message: `Entrez le mot de passe à usage unique (OTP) composé de 4 chiffres envoyé à votre telephone portable : ${verification}.`,
      sender: 'Flex Waren',
      sandbox: 0,
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch('https://api.softartisan.net/softsms/send', requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
  }

  function CheickNmber() {
    var formdata = new FormData()
    formdata.append('number', number)

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    }

    fetch('https://prumad.com/API/index2.php?connexionUD', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result?.status == 405) {
          console.log(result)
          sendSMS()
        } else {
          navigation.goBack()
          Alert.alert(
            'Ce numero est lié à un compte, veillez vous connecter et non vous inscrire !',
          )
        }
      })
      .catch(error => console.log('error', error))
  }

  React.useEffect(() => {
    CheickNmber()
  }, [])
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
                fontSize: 15,
                marginLeft: 20,
                fontWeight: 'bold',
              },
            ]}
          >
            {Fr.NmTT2}
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
          {Fr.NmTT2H1}
        </Text>
        <Text
          style={{
            alignSelf: 'center',
            color: 'red',
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          +225 {number}
          <Text style={{ color: '#3DB24B' }}> {Fr.Mdf}</Text>
        </Text>
        <View
          style={[
            {
              alignSelf: 'center',
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
          <TextInput
            numberOfLine={1}
            maxLength={1}
            keyboardType={'number-pad'}
            onChangeText={val => setnumber1(val)}
            style={[
              {
                color: 'black',
                fontSize: 15,
                width: windowWidth / 7,
                backgroundColor: 'white',
                textAlign: 'center',
                margin: 2,
                fontWeight: 'bold',
              },
            ]}
          />

          <TextInput
            maxLength={1}
            keyboardType={'number-pad'}
            onChangeText={val => setnumber2(val)}
            style={[
              {
                color: 'black',
                fontSize: 15,
                width: windowWidth / 7,
                backgroundColor: 'white',
                textAlign: 'center',
                margin: 2,
                fontWeight: 'bold',
              },
            ]}
          />

          <TextInput
            maxLength={1}
            keyboardType={'number-pad'}
            onChangeText={val => setnumber3(val)}
            style={[
              {
                color: 'black',
                fontSize: 15,
                width: windowWidth / 7,
                backgroundColor: 'white',
                textAlign: 'center',
                margin: 2,
                fontWeight: 'bold',
              },
            ]}
          />

          <TextInput
            maxLength={1}
            keyboardType={'number-pad'}
            onChangeText={val => setnumber4(val)}
            style={[
              {
                color: 'black',
                fontSize: 15,
                width: windowWidth / 7,
                backgroundColor: 'white',
                textAlign: 'center',
                margin: 2,
                fontWeight: 'bold',
              },
            ]}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: 'red',
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          {Fr.MTTT} {count} Sec Mais s'arrete après 3 Envois automatiques
        </Text>

        <View style={{ height: 10 }} />
        <View>
          <TouchableOpacity
            onPress={() => codeIsValidate()}
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

export default NmberVerif2
