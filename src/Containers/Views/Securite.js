/**
 * Sample React Native Securite
 * https://github.com/facebook/react-native
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
  TextInput,
} from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

//My Src Import
import Colors from '../Utils/Colors.js'
import Iconsimg from '../Utils/Img'
import Fr from '../Utils/Fr'
import Generalstyle from '../Utils/GeneralStyle'
import Header from '../Components/Header'

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
//End

const Securite: () => Node = ({ navigation, route }) => {
  const [data, setData] = React.useState()
  const [NumberPrivacy, setNumberPrivacy] = React.useState()
  const { u_dataV, timestamp } = route.params
  function MyNumberPrivacy() {
    fetch(
      `http://prumad.com/API/index2.php?getPrivacytNumber=${u_dataV?.u_data?.id}`,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setNumberPrivacy(result)
      })
      .catch(err => console.log(err))
  }
  React.useEffect(() => {
    MyNumberPrivacy()
  }, [NumberPrivacy])
  //console.log(Colors.GreenLignt?.color)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Index')}
        style={{ margin: 20 }}
      >
        <Icon size={30} color={Colors.GreenLignt?.color} name="arrowleft" />
      </TouchableOpacity>
      <View style={[{ margin: 20 }]}>
        <Text
          style={[
            Generalstyle.bold,
            { fontSize: 20 },
            Generalstyle.alignSelf,
            Colors.GreenLignt,
          ]}
        >
          Securité
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailSecurite', {
                  u_dataV: u_dataV,
                  timestamp: timestamp,
                  number: NumberPrivacy,
                  action: 'contactDC',
                })
              }
              style={[
                Generalstyle.row,
                {
                  justifyContent: 'center',
                  height: 100,
                  width: 100,
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 100,
                  marginBottom: 30,
                  marginTop: 30,
                },
                Generalstyle.shadow,
              ]}
            >
              <Image
                source={Iconsimg.icon_contact_confiance}
                style={{
                  alignSelf: 'center',
                  height: 60,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                color: 'black',
                width: 100,
                textAlign: 'center',
              }}
            >
              Contact de confiance
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailSecurite', {
                  u_dataV: u_dataV,
                  timestamp: timestamp,
                  number: NumberPrivacy,
                  action: 'numeroDU',
                })
              }
              style={[
                Generalstyle.row,
                {
                  justifyContent: 'center',
                  height: 100,
                  width: 100,
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 100,
                  marginBottom: 30,
                  marginTop: 30,
                },
                Generalstyle.shadow,
              ]}
            >
              <Image
                source={Iconsimg.icon_warn}
                style={{
                  alignSelf: 'center',
                  height: 60,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                color: 'black',
                width: 100,
                textAlign: 'center',
              }}
            >
              Numéro d'urgence
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Securite
