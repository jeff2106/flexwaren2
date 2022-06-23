/**
 * Sample React Native PolitiqueConf
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
  ImageBackground,
  TextInput,
  Platform,
} from 'react-native'

//My Src Import
import Colors from '../Utils/Colors.js'
import Iconsimg from '../Utils/Img'
import Fr from '../Utils/Fr'
import Generalstyle from '../Utils/GeneralStyle'
import Pusher from 'pusher-js/react-native'
import PushNotification from 'react-native-push-notification'
import CheckBox from '@react-native-community/checkbox'

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

//End

const PolitiqueConf: () => Node = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const [notification, setNotification] = React.useState(false)
  const [isSelected, setIsSelected] = React.useState(false)

  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  )

  /* === Notifications ====*/
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
      <View style={[{ margin: 20, flexDirection: 'row', marginTop: 50 }]}>
        <Image
          style={[
            { resizeMode: 'contain', width: 50, height: 50, marginTop: 10 },
          ]}
          source={Iconsimg.sys_write_cndit}
        />
        <Text
          style={[
            {
              width: windowWidth / 1.4,
              fontSize: 18,
              lineHeight: 30,
              color: 'black',
              textAlign: 'center',
            },
            Generalstyle.bold,
          ]}
        >
          Acceptez les conditions générales de Flex Waren et consultez la
          déclaration de confidentialité
        </Text>
      </View>
      <Text
        style={[{ margin: 20, fontSize: 15, opacity: 0.7, color: 'black' }]}
      >
        En sélectionnant J'accepte ,ci-dessous, vous acceptez les conditions
        générale et vous reconnaissez avoir lu la Déclaration de
        confidentialité. J'ai au moins 18 ans{' '}
      </Text>
      <View
        style={{
          borderWidth: 1,
          margin: 20,
          opacity: 0.2,
          marginTop: windowHeight / 10,
        }}
      />
      <View
        style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}
      >
        <CheckBox
          value={isSelected}
          onValueChange={val => setIsSelected(val)}
        />
        <Text
          style={[
            { fontSize: 15, color: 'black', marginLeft: 10 },
            Generalstyle.bold,
          ]}
        >
          J'accepte
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          marginLeft: 20,
          marginRight: 20,
          opacity: 0.2,
          marginTop: windowHeight / 40,
        }}
      />
      {!isSelected ? (
        <View
          style={[
            !isSelected ? Colors.Gray_BG : Colors.GreenLignt_BG,
            {
              position: 'absolute',
              bottom: 20,
              width: '70%',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              alignSelf: 'center',
              borderRadius: 40,
            },
          ]}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
            {' '}
            Suivant{' '}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('CreatUserI')}
          style={[
            !isSelected ? Colors.Gray_BG : Colors.GreenLignt_BG,
            {
              position: 'absolute',
              bottom: 20,
              width: '70%',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              alignSelf: 'center',
              borderRadius: 40,
            },
          ]}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
            {' '}
            Suivant{' '}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
})

export default PolitiqueConf
