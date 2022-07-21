/**
 * Sample React Native Courses
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
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/AntDesign'
import ImagePicker from 'react-native-image-crop-picker'
import PushNotification from 'react-native-push-notification'
import Pusher from 'pusher-js/react-native'
import CardDrivers2 from '../../../Components/CardDrivers2.js'
import ActionSheet from '../../../Components/bottomsheet.js'
import PushNotificationIOS from '../../../js'

//My Src Import
import Colors from '../../../Utils/Colors.js'
import Iconsimg from '../../../Utils/Img'
import Fr from '../../../Utils/Fr'
import Generalstyle from '../../../Utils/GeneralStyle'

//Get Reel Dimension of Screen[]
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const { width, height } = Dimensions.get('screen')
//End

const Courses: () => Node = ({ navigation, route }) => {
  const isDarkMode = useColorScheme() === '#3DB24B'
  const { u_data, timestamp } = route.params
  const backgroundStyle = {
    backgroundColor: '#3DB24B',
    width: windowWidth,
    height: windowHeight,
  }
  const [modalVisible, setModalVisible] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [Drivers, setDrivers] = React.useState()
  const [MyAbonnment, setMyAbonnment] = React.useState()
  const [refreshing, setRefreshing] = React.useState(true)

  let navigations

  const today = new Date()
  const yyyy = today.getFullYear()
  let mm = today.getMonth() + 1 // Months start at 0!
  let dd = today.getDate()

  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }

  const todays = dd + '/' + mm + '/' + yyyy

  function getAlert() {
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    }

    fetch(
      'https://api.prumad.com/_race/Race_intervilles_travailleurs/' +
        u_data?.id +
        '/' +
        Fr.IntV.toLowerCase(),
      {
        method: 'GET',
        headers: headersList,
      },
    )
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        if (!data.status) {
          setDrivers(data.data)
          setIsLoading(false)
          console.log(data)
        } else {
          setDrivers([])
          setIsLoading(false)
          console.log(data)
        }
      })
  }

  function getMyAbonnment() {
    var requestOptions2 = {
      method: 'GET',
      redirect: 'follow',
    }

    fetch(
      `https://prumad.com/API/index2.php?MonAbonnementIntervilles=${u_data?.id}`,
      requestOptions2,
    )
      .then(response2 => response2.json())
      .then(result2 => (setMyAbonnment(result2), console.log(result2)))
      .catch(error2 => console.log('error2', error2))
  }

  /* ========= NOTIFICATIONS ====== */
  /* === Notifications ====*/
  const [permissions, setPermissions] = React.useState({})

  React.useEffect(() => {
    PushNotificationIOS.addEventListener('register', onRegistered)
    PushNotificationIOS.addEventListener(
      'registrationError',
      onRegistrationError,
    )
    PushNotificationIOS.addEventListener('notification', onRemoteNotification)
    PushNotificationIOS.addEventListener(
      'localNotification',
      onLocalNotification,
    )

    PushNotificationIOS.requestPermissions({
      alert: true,
      badge: true,
      sound: true,
      critical: true,
    }).then(
      data => {
        console.log('PushNotificationIOS.requestPermissions', data)
      },
      data => {
        console.log('PushNotificationIOS.requestPermissions failed', data)
      },
    )

    return () => {
      PushNotificationIOS.removeEventListener('register')
      PushNotificationIOS.removeEventListener('registrationError')
      PushNotificationIOS.removeEventListener('notification')
      PushNotificationIOS.removeEventListener('localNotification')
    }
  }, [])

  const sendNotification = () => {
    DeviceEventEmitter.emit('remoteNotificationReceived', {
      remote: true,
      aps: {
        alert: { title: 'title', subtitle: 'subtitle', body: 'body' },
        badge: 1,
        sound: 'default',
        category: 'REACT_NATIVE',
        'content-available': 1,
        'mutable-content': 1,
      },
    })
  }

  const sendSilentNotification = () => {
    DeviceEventEmitter.emit('remoteNotificationReceived', {
      remote: true,
      aps: {
        category: 'REACT_NATIVE',
        'content-available': 1,
      },
    })
  }

  const sendLocalNotification = message => {
    PushNotificationIOS.presentLocalNotification({
      alertTitle: 'Flex Waren',
      alertBody: message,
      applicationIconBadgeNumber: 1,
    })
  }

  const sendLocalNotificationWithSound = () => {
    PushNotificationIOS.addNotificationRequest({
      id: 'notificationWithSound',
      title: 'Sample Title',
      subtitle: 'Sample Subtitle',
      body: 'Sample local notification with custom sound',
      sound: 'customSound.wav',
      badge: 1,
    })
  }
  const scheduleLocalNotification = () => {
    PushNotificationIOS.scheduleLocalNotification({
      alertBody: 'Test Local Notification',
      fireDate: new Date(new Date().valueOf() + 2000).toISOString(),
    })
  }

  const addNotificationRequest = () => {
    PushNotificationIOS.addNotificationRequest({
      id: 'test',
      title: 'title',
      subtitle: 'subtitle',
      body: 'body',
      category: 'test',
      threadId: 'thread-id',
      fireDate: new Date(new Date().valueOf() + 2000),
      repeats: true,
      userInfo: {
        image: 'https://www.github.com/Naturalclar.png',
      },
    })
  }

  const addCriticalNotificationRequest = () => {
    PushNotificationIOS.addNotificationRequest({
      id: 'critical',
      title: 'Critical Alert',
      subtitle: 'subtitle',
      body: 'This is a critical alert',
      category: 'test',
      threadId: 'thread-id',
      isCritical: true,
      fireDate: new Date(new Date().valueOf() + 2000),
      repeats: true,
    })
  }

  const addMultipleRequests = () => {
    PushNotificationIOS.addNotificationRequest({
      id: 'test-1',
      title: 'First',
      subtitle: 'subtitle',
      body: 'First Notification out of 3',
      category: 'test',
      threadId: 'thread-id',
      fireDate: new Date(new Date().valueOf() + 10000),
      repeats: true,
    })

    PushNotificationIOS.addNotificationRequest({
      id: 'test-2',
      title: 'Second',
      subtitle: 'subtitle',
      body: 'Second Notification out of 3',
      category: 'test',
      threadId: 'thread-id',
      fireDate: new Date(new Date().valueOf() + 12000),
      repeats: true,
    })

    PushNotificationIOS.addNotificationRequest({
      id: 'test-3',
      title: 'Third',
      subtitle: 'subtitle',
      body: 'Third Notification out of 3',
      category: 'test',
      threadId: 'thread-id',
      fireDate: new Date(new Date().valueOf() + 14000),
      repeats: true,
    })
  }

  const getPendingNotificationRequests = () => {
    PushNotificationIOS.getPendingNotificationRequests(requests => {})
  }

  const setNotificationCategories = async () => {
    PushNotificationIOS.setNotificationCategories([
      {
        id: 'test',
        actions: [
          { id: 'open', title: 'Open', options: { foreground: true } },
          {
            id: 'ignore',
            title: 'Desruptive',
            options: { foreground: true, destructive: true },
          },
          {
            id: 'text',
            title: 'Text Input',
            options: { foreground: true },
            textInput: { buttonTitle: 'Send' },
          },
        ],
      },
    ])
  }

  const onRegistered = deviceToken => {}

  const onRegistrationError = error => {}

  const onRemoteNotification = notification => {
    const isClicked = notification.getData().userInteraction === 1

    const result = `
    Title:  ${notification.getTitle()};\n
    Subtitle:  ${notification.getSubtitle()};\n
    Message: ${notification.getMessage()};\n
    badge: ${notification.getBadgeCount()};\n
    sound: ${notification.getSound()};\n
    category: ${notification.getCategory()};\n
    content-available: ${notification.getContentAvailable()};\n
    Notification is clicked: ${String(isClicked)}.`

    if (notification.getTitle() == undefined) {
    } else {
    }
  }

  const onLocalNotification = notification => {
    const isClicked = notification.getData().userInteraction === 1
  }

  const showPermissions = () => {
    PushNotificationIOS.checkPermissions(permissions => {
      setPermissions({ permissions })
    })
  }

  //

  Pusher.logToConsole = false

  var pusher = new Pusher('e4ad133537d71dc9e689', {
    cluster: 'mt1',
  })

  var channel = pusher.subscribe('Intervilles')
  channel.bind('NewBooking', function (data) {
    if (data?.iDDrivers == u_data?.id) {
      sendLocalNotification('Vous avez une nouvelle reservation')
    }
  })
  /* === Notifications ====*/

  React.useEffect(() => {
    setIsLoading(true)
    setDrivers([])
    getAlert()
    getMyAbonnment()
  }, [timestamp])

  return (
    <View style={[{ flex: 1 , backgroundColor: 'white'}]}>
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
      <View
        style={[
          {
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
          Colors.GreenLignt_BG,
        ]}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
          Mes alertes{' '}
        </Text>
      </View>

      <View style={{ height: 20, backgroundColor:'white' }} />

      <ScrollView style={{ flex: 1 , backgroundColor:'white'}}>
        {isLoading == false && Drivers?.length < 1 && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 40,
            }}
          >
            <Image
              source={Iconsimg.sys_emptyAlert}
              style={[
                Generalstyle.DefaultImg,
                {
                  width: 90,
                },
              ]}
            />
            {MyAbonnment?.status == '404' ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('IndexP', {
                    u_data: u_data,
                    timestamp: timestamp,
                  })
                }
                style={[
                  Colors.GreenLignt_BG,
                  {
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    borderRadius: 20,
                  },
                ]}
              >
                <Text style={[Generalstyle.bold, Colors.White]}>
                  Créer une alerte
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('NAlert', {
                    u_data: u_data,
                    timestamp: timestamp,
                  })
                }
                style={[
                  Colors.GreenLignt_BG,
                  {
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    borderRadius: 20,
                  },
                ]}
              >
                <Text style={[Generalstyle.bold, Colors.White]}>
                  Créer une alerte
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {isLoading && <ActivityIndicator size="large" />}
        {Drivers?.map((i, k) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CoursesDetails', {
                DDetails: i,
                u_data: u_data,
                timestamp: new Date().getTime(),
              })
            }}
            key={k}
            style={[]}
          >
            <CardDrivers2 item={i} userData={u_data} />
          </TouchableOpacity>
        ))}
        <View style={{ height: 50 }} />
      </ScrollView>
      <View style={{ height: 20, borderBottom: 1 }} />
      {Drivers?.length > 0 && (
        <View
          style={[
            {
              height: 70,
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
          {MyAbonnment?.status == '404' && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('IndexP', {
                  u_data: u_data,
                  timestamp: new Date().getTime(),
                })
              }
              style={[
                Colors.GreenLignt_BG,
                {
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                  borderRadius: 20,
                },
              ]}
            >
              <Text style={[Generalstyle.bold, Colors.White]}>
                Créer une alerte
              </Text>
            </TouchableOpacity>
          )}

          {MyAbonnment?.status != 404 && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('NAlert', {
                  u_data: u_data,
                  timestamp: new Date().getTime(),
                })
              }
              style={[
                Colors.GreenLignt_BG,
                {
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                  borderRadius: 20,
                },
              ]}
            >
              <Text style={[Generalstyle.bold, Colors.White]}>
                Créer une alerte
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  )
}

export default Courses
