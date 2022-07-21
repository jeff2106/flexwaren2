/**
 * Sample React Native CoursesDetails
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

import CardDrivers2 from '../../../Components/CardDrivers2.js'

import Drivers from '../../../DemoData/DriversData2'

//My Src Import
import Colors from '../../../Utils/Colors.js'
import Iconsimg from '../../../Utils/Img'
import Fr from '../../../Utils/Fr'
import Generalstyle from '../../../Utils/GeneralStyle'

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
//End

const CoursesDetails: () => Node = ({ navigation, route }) => {
  const isDarkMode = useColorScheme() === '#3DB24B'
const { DDetails,timestamp,u_data } = route.params
  const backgroundStyle = {
    backgroundColor: '#3DB24B',
    width: windowWidth,
    height: windowHeight,
  }

  //:new Date().getTime()

  const [modalVisible, setModalVisible] = React.useState(false)
  const [count, setcount] = React.useState(120)
  function courseStart() {
    var requestOptions = {
      method: 'PUT',
      redirect: 'follow',
    }
    fetch(
      `https://prumad.com/API/index2.php?CourseStart=${DDetails?.id}&TypeCourse=Intervilles&channel=CourseStartInterville`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result)
        navigation.navigate('CoursesStart', {
          DDetails: DDetails,
          timestamp: new Date().getTime(),
          u_data: u_data,
        })
      })
      .catch(error => console.log('error', error))
  }

  /* <------ */
  function courseDelete() {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    }

    fetch(
      `https://prumad.com/API/?CourseDelete=${DDetails?.id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        navigation.navigate('Courses', {
          DDetails: DDetails,
          timestamp: new Date().getTime(),
          u_data: u_data,
        })
      })
      .catch(error => console.log('error', error))
  }

  /* <-------- */
  function startCourse() {
    var formdata = new FormData()
    formdata.append('startCourse', '1');
    formdata.append('id', DDetails?.id)

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    }

    fetch('https://prumad.com/API/?startCourseNow', requestOptions)
      .then(response => response.text())
      .then(result => {
        navigation.navigate('Courses', {
          DDetails: DDetails,
          timestamp: new Date().getTime(),
          u_data: u_data,
        })
      })
      .catch(error => console.log('error', error))
  }
  return (
    <View style={[{ height: windowHeight, flex: 1 , backgroundColor: 'white'}]}>
      <View
        style={[
          Colors.Green_BG,
          {
            height: windowHeight / 8,
            alignItems: 'center',
            flexDirection: 'row',
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon
            name="menu"
            size={20}
            style={[
              Colors.White,
              { marginRight: windowHeight / 7, marginLeft: 10 },
            ]}
          />
        </TouchableOpacity>
        <View>
          <Text
            style={[
              {
                color: 'white',
                fontSize: 15,
                fontWeight: 'bold',
                textAlign: 'center',
              },
            ]}
          >
            {Fr.IntV}
          </Text>
          <Image
            source={Iconsimg.icon_interville}
            style={[
              Generalstyle.DefaultImg,
              {
                width: 90,
              },
            ]}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Courses', {
            DDetails: DDetails,
            timestamp: new Date().getTime(),
            u_data: u_data,
          })
        }
        style={[
          {
            height: 70,
            alignItems: 'center',
            flexDirection: 'row',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
          Colors.GreenLignt_BG,
        ]}
      >
        <Icon
          name="arrow-back"
          size={25}
          style={[
            Colors.White,
            { marginRight: windowHeight / 7, marginLeft: 10 },
          ]}
        />
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
          Mes alertes
        </Text>
      </TouchableOpacity>

      <View style={{ height: 20, backgroundColor: 'white' }} />
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={[
            Generalstyle.shadow,
            {
              width: '90%',
              alignSelf: 'center',
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 10,
              backgroundColor: 'white',
            },
          ]}
        >
          <Text style={{ margin: 10, color: 'black' }}>
            Alerte n°{DDetails?.id}
          </Text>
          <Text style={{ margin: 10, color: 'black' }}>
            Service à rendre le: {DDetails?.date}
          </Text>
          <Text style={{ margin: 10, color: 'black' }}>
            Prix unitaire:{' '}
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              {DDetails?.price} XOF
            </Text>
          </Text>
          <Text style={{ margin: 10, color: 'black' }}>
            Total:{' '}
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              {DDetails?.DriverData?.reservations * DDetails?.price} FCFA
            </Text>
          </Text>
        </View>
        <View style={{ height: 15 }} />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 17,
            marginLeft: 15,
            color: 'black',
          }}
        >
          Service
        </Text>
        <View style={{ height: 15 }} />
        <View
          style={[
            Generalstyle.shadow,
            {
              width: '90%',
              alignSelf: 'center',
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 10,
              backgroundColor: 'white',
            },
          ]}
        >
          <Text style={{ marginTop: 10, color: 'black' }}>
            Le voyage commence à :{' '}
            <Text style={{ color: 'red' }}>{DDetails?.hours}</Text>
          </Text>
          <View style={{ flexDirection: 'row', marginTop: -10 }}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${DDetails?.DriverData?.photoProfil}` }}
              style={[
                {
                  width: 60,
                  height: 60,
                  resizeMode: 'cover',
                  marginRight: 5,
                  borderRadius: 100,
                },
                Generalstyle.alignSelf,
              ]}
            />
            <View>
              <Text style={{ margin: 10, color: 'black' }}>
                {DDetails?.destination}
              </Text>
              <Text style={{ margin: 10, color: 'black' }}>
                Place occupée : {DDetails?.DriverData?.reservations} /
                {DDetails?.seats}
              </Text>
              <Text style={{ margin: 10, color: 'black' }}>
                Prix unitaire : {DDetails?.price} FCFA
              </Text>
              <Text style={{ margin: 10, color: 'black' }}>
                Départ: {DDetails?.whereAreYou} / {DDetails?.districtWAY}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ height:15 }}/>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 17,
            marginLeft: 15,
            color: 'black',
          }}
        >
          Paiement
        </Text>
        <View style={{ height:15 }}/>

        <View
          style={[
            Generalstyle.shadow,
            {
              width: '90%',
              alignSelf: 'center',
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 10,
              backgroundColor: 'white',
            },
          ]}
        >
          <Text
            style={{
              margin: 10,
              color: 'black',
              fontWeight: 'bold',
              fontSize: 17,
            }}
          >
            Mode de paiement
          </Text>
          <Text style={{ margin: 10, color: 'black' }}>
            Reversé par Flex Warren
          </Text>
        </View>
        <View style={{ height:15 }}/>

        <View
          style={[
            Generalstyle.shadow,
            {
              width: '90%',
              alignSelf: 'center',
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 10,
              backgroundColor: 'white',
            },
          ]}
        >
          <Text
            style={{
              margin: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: 'black',
            }}
          >
            Sous-Total
          </Text>
          <Text style={{ margin: 10, color: 'black' }}>
            Service --------------- {DDetails?.price} X{' '}
            {DDetails?.DriverData?.reservations}
          </Text>
          <Text
            style={{
              margin: 10,
              fontWeight: 'bold',
              fontSize: 15,
              color: 'black',
            }}
          >
            Total ---------------{' '}
            {DDetails?.DriverData?.reservations * DDetails?.price} XOF
          </Text>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
      <View style={{ height: 20, borderBottom: 1 }} />
      {DDetails.state == 'in progress' && (
        <View
          style={[
            {
              height: 60,
              width: '100%',
              alignSelf: 'center',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 0,
            },
            Colors.darkGreen_BG,
          ]}
        >
          <TouchableOpacity
            onPress={() => courseStart()}
            style={[
              Colors.GreenLignt_BG,
              {
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                borderRadius: 12,
              },
            ]}
          >
            <Text style={[Generalstyle.bold, Colors.White]}>
              Commencer le voyage
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => courseDelete()}
            style={[
              {
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                borderRadius: 12,
                backgroundColor: 'red',
              },
            ]}
          >
            <Text style={[Generalstyle.bold, Colors.White]}>
              Supprimer l'alerte
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {DDetails.state != 'in progress' &&
        <View
          style={[
            {
              height: 60,
              width: '100%',
              alignSelf: 'center',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 0,
            },
            Colors.darkGreen_BG,
          ]}
        >
          <TouchableOpacity
            onPress={() => courseDelete()}
            style={[
              {
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                borderRadius: 12,
                backgroundColor: 'red',
              },
            ]}
          >
            <Text style={[Generalstyle.bold, Colors.White]}>
              Supprimer l'alerte
            </Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
};

export default CoursesDetails
