/**
 * Sample React Native PaymentMethode
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

const PaymentMethode: () => Node = ({ navigation, route }) => {
  const [data, setData] = React.useState()

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
          Mode de paiement
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('PaymentConfirmation')}
          style={[
            Generalstyle.row,
            {
              justifyContent: 'space-between',
              height: 50,
              padding: 10,
              borderRadius: 12,
              marginTop: 30,
            },
            Generalstyle.shadow,
          ]}
        >
          <Text>Mobile Money</Text>
          <MaterialIcons
            size={30}
            color={Colors.GreenLignt?.color}
            name="keyboard-arrow-right"
          />
        </TouchableOpacity>
        <View
          style={[
            {
              justifyContent: 'space-between',
              height: 'auto',
              padding: 10,
              borderRadius: 12,
              marginTop: 30,
            },
            Generalstyle.shadow,
          ]}
        >
          <View
            style={[
              Generalstyle.row,
              {
                justifyContent: 'space-between',
                height: 50,
                padding: 10,
                borderRadius: 12,
              },
            ]}
          >
            <View style={Generalstyle.row}>
              <FontAwesome
                size={30}
                color={Colors.GreenLignt?.color}
                name="money"
              />
              <Text style={{ marginLeft: 10 }}>Espèces</Text>
            </View>
            <Ionicons
              size={30}
              color={Colors.GreenLignt?.color}
              name="checkmark-circle-outline"
            />
          </View>
          <Text>
            Le paiement par mobile money est un moyen pratique que vous pouvez
            utiliser. Inutile de prendre votre porte-monnaie et d'attendre la
            monnai : la somme est prélevéé automatiquement après la course
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          Generalstyle.alignSelf,
          {
            backgroundColor: Colors.red.color,
            width: '80%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            position: 'absolute',
            bottom: 20,
          },
        ]}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Fermer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default PaymentMethode
