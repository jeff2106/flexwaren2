/**
 * Sample React Native RaceCourseStart
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import type { Node } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons from 'react-native-vector-icons/AntDesign'
import Geolocation from '@react-native-community/geolocation'
//My Src Import
import Colors from '../../../Utils/Colors.js'
import Iconsimg from '../../../Utils/Img'
import Generalstyle from '../../../Utils/GeneralStyle'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
//Get Reel Dimension of Screen[]

//End

const RaceCourseStart: () => Node = ({ navigation, route }) => {
  const { CustomersAvailableData, u_data, timestamp, Amount } = route.params
  const [displayD3, setdisplayD3] = React.useState(false)
  const origin = { latitude: 37.78825, longitude: -122.4324 }
  const destination = { latitude: 37.771707, longitude: -122.4053769 }
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDSbg654fWaJihkk3FIk52Je8viclmsYCU'
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
      setCurentPosition({
        ...curentPosition,
        latitude,
        longitude,
      })
    })
  }, [curentPosition?.latitude])

  /* === Notifications ====*/
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[{ position: 'absolute', top: 10, zIndex: 4 }]}
        onPress={() => navigation.openDrawer()}
      >
        <Icon name="menu" size={30} style={[Colors.Dark]} />
      </TouchableOpacity>
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapType="standard"
        followsUserLocation={true}
        initialRegion={curentPosition}
        style={styles.map}
      >
        <MapViewDirections
          strokeWidth={3}
          strokeColor={Colors.GreenLignt.color}
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
        />
      </MapView>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 20,
          alignSelf: 'center',
          backgroundColor: 'white',
          width: '40%',
          padding: 20,
          alignItems: 'center',
          height: 'auto',
          justifyContent: 'space-between',
          borderRadius: 30,
        }}
      >
        <Image source={Iconsimg.icon_customs} />
        <View>
          <Text style={{ fontSize: 15, marginLeft: 10 }}>Texas Grills</Text>
          <Text style={{ fontSize: 15, marginLeft: 10 }}>Rue D43</Text>
        </View>
      </View>

      {
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            backgroundColor: 'white',
            width: '100%',
            alignItems: 'center',
            height: 'auto',
            justifyContent: 'center',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            padding: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              width: '100%',
            }}
          >
            <TouchableOpacity
              style={[]}
              onPress={() => setdisplayD3(!displayD3)}
            >
              {displayD3 ? (
                <Icons name="up" size={30} style={[Colors.Dark]} />
              ) : (
                <Icons name="down" size={30} style={[Colors.Dark]} />
              )}
            </TouchableOpacity>
            <View>
              <Text
                style={{ fontSize: 20, color: 'black', textAlign: 'center' }}
              >
                10 min & 200 m
              </Text>
            </View>
            <TouchableOpacity
              style={[
                Generalstyle.shadow,
                Colors.White_BG,
                {
                  height: 50,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                },
              ]}
              onPress={() => alert('call number')}
            >
              <Icons name="phone" size={30} style={[Colors.Dark]} />
            </TouchableOpacity>
          </View>
          <Text />
          {displayD3 && (
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={[
                  Generalstyle.shadow,
                  Colors.White_BG,
                  {
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                  },
                ]}
                onPress={() => navigation.navigate('AccueilCovoiturageP')}
              >
                <Icons name="close" size={30} style={[{ color: 'red' }]} />
              </TouchableOpacity>
              <Text />
              <Text style={{ fontSize: 15, color: 'black' }}>
                Annuler le voyage
              </Text>
              <Text />
            </View>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate('RaceInPending')}
            style={[
              Generalstyle.shadow,
              Colors.White_BG,
              {
                height: 40,
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
              },
              Colors.GreenLignt_BG,
            ]}
          >
            <Text style={{ fontSize: 15, color: 'white' }}>COMMENCER</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})
export default RaceCourseStart
